import { useToast } from "@chakra-ui/toast";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import io from "socket.io-client";
import { useRouter } from "next/router";
const ENDPOINT = "http://localhost:5000";
const Context = createContext();

function AppProvider({ children }) {
  const socketRef = useRef();
  const watchLocation = useRef();

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [hasAccessLocation, setHasAccessLocation] = useState(false);

  const router = useRouter();

  const toast = useToast();

  const connectSocket = () => {
    socketRef.current = io(ENDPOINT);
  };

  const disconnectSocket = () => {
    if (socketRef.current) {
      socketRef.current.emit("disconnect");
    }
  };

  useEffect(() => {
    connectSocket();

    if (socketRef.current) {
      socketRef.current.on("new-user", (data) => {
        setUsers((users) => [...users, data]);
      });

      socketRef.current.on("users", (data) => {
        setUsers(data);
      });

      socketRef.current.on("current-user", (data) => {
        setCurrentUser(data);
      });

      socketRef.current.on("position-change", (data) => {
        let users = users.map((user) => {
          if (user.socketId === data.soketId) {
            return data;
          }
          return user;
        });
      });
    }

    if (hasAccessLocation) {
      watchLocation.current = navigator.geolocation.watchPosition(
        positionChange,
        locationResolveError
      );
    }

    return () => {
      navigator.geolocation.clearWatch(watchLocation.current);
      disconnectSocket();
    };
  }, []);

  function positionChange(data) {
    const latitude = data.coords.latitude;
    const longitude = data.coords.longitude;
    socketRef.current.emit("position-change", {
      socketId: currentUser.socketId,
      coords: {
        latitude,
        longitude,
      },
    });
  }

  function initUserLocation() {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation Unsupported",
        description: "Your system does not support Geolocation",
        status: "error",
        duration: 4000,
        isClosable: true,
      });

      return;
    }
    navigator.geolocation.getCurrentPosition(
      locationResolveSuccessfully,
      locationResolveError
    );
  }

  function locationResolveSuccessfully(data) {
    setHasAccessLocation(true);
    const latitude = data.coords.latitude;
    const longitude = data.coords.longitude;
    socketRef.current.emit("join", {
      latitude,
      longitude,
    });
    toast({
      title: "Location",
      description: "Location fetched successfully",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    router.push("/location");
  }

  function locationResolveError(error) {
    let errorType = "";
    if (error.code === 1) {
      errorType = "Permission Denied";
    } else if (error.code === 2) {
      errorType = "Position Unavailable";
    } else if (error.cde === 3) {
      errorType = "Timeout";
    }

    toast({
      title: errorType,
      description: error.message,
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  }

  return (
    <Context.Provider
      value={{
        initUserLocation,
        users,
        currentUser,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useApp = () => useContext(Context);

export default AppProvider;
