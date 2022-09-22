import {useEffect} from "react";
import {useRouter} from "next/router";
import {PATH_DASHBOARD} from "../../routes/paths";


export default function Index() {
  const {replace} = useRouter();

  useEffect(() => {
    replace(PATH_DASHBOARD.gestao.app)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null;
}