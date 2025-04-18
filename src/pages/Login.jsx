import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const { signInWithGoogle, signInWithEmail, currentUser } = UserAuth();

  const handleLoginWithEmail = async () => {
    setLoading(true);
    try {
      await signInWithEmail(email, password);
      toast({ title: "Login successful", status: "success", position: "top" });
    } catch (err) {
      toast({
        title: "Login failed",
        description: err.message,
        status: "error",
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignInWithGoogle = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <Center w="100%" h="100dvh" px="10px">
      <Flex flexDir="column" maxW="400px" w="100%" gap="20px">
        <Text fontSize="lg" mt="20px">Sign in with Email</Text>
        <Input
          color="black"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          color="black"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          isLoading={loading}
          onClick={handleLoginWithEmail}
          colorScheme="teal"
        >
          Login
        </Button>

        <Text color="gray.600">
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "blue" }}>
            Register
          </Link>
        </Text>

        <Flex my="25px" align="center" px="10%">
          <Divider />
          <Text px="15px">OR</Text>
          <Divider />
        </Flex>

        <Button onClick={handleSignInWithGoogle} colorScheme="red">
          Sign in with Google
        </Button>
      </Flex>
    </Center>
  );
}

export default Login;
