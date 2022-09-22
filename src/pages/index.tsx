import type {NextPage} from 'next'
import {useRouter} from "next/router";
import {useEffect} from "react";
import {PATH_DASHBOARD} from "../routes/paths";

const Home: NextPage = () => {
  const {replace} = useRouter();

  useEffect(() => {
    replace(PATH_DASHBOARD.gestao.app)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null;
}

export default Home