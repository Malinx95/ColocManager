import { NextPage } from "next";
import Card from "../components/Card";
import PageWrapper from "../components/PageWrapper";
import Title from "../components/Title";
import Input from "../components/Input";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import sha256 from "crypto-js/sha256";
import { signIn } from "next-auth/react";

const Register: NextPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    setValidated(false);
  }, [username]);

  async function checkUsername(username: string) {
    let res = await fetch("/api/auth/checkUsername", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username }),
    });
    let decoded = await res.json();
    setError(decoded.exists);
    setValidated(true);
  }

  return (
    <PageWrapper
      title="Register"
      description="Register to Coloc Manager"
      absolute
    >
      <Title />
      <Card
        title="Register"
        subtitle="There is no account linked to this username, you can join us here !"
      >
        <Input
          type="text"
          placeholder="*Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError(false);
          }}
          onBlur={() => checkUsername(username)}
          error={error}
          errorMessage="This username is already taken"
          valid={!error && username.length > 0 && validated}
        />
        <Input
          type="password"
          placeholder="*Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          valid={password2.length > 0 && password === password2}
        />
        <Input
          type="password"
          placeholder="*Confirm Password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          error={password2.length > 0 && password !== password2}
          errorMessage="Passwords don't match"
          valid={password2.length > 0 && password === password2}
        />
        <Button
          text="Register"
          disabled={
            error ||
            password !== password2 ||
            password.length === 0 ||
            password2.length === 0
          }
          onClick={() => {
            fetch("/api/auth/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: username,
                password: sha256(password).toString(),
              }),
            }).then((res) => {
              if (res.status === 200) {
                signIn("credentials", {
                  username: username,
                  password: sha256(password).toString(),
                  callbackUrl: "/dashboard",
                });
              }
            });
          }}
        />
      </Card>
    </PageWrapper>
  );
};

export default Register;
