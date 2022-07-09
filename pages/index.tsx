import { useRouter } from "next/router";
import { NextPage } from "next/types";

const Home: NextPage = () => {
  const router = useRouter();
  if (typeof window !== "undefined") {
    router.push("/login");
  }
  return null;
};

export default Home;
