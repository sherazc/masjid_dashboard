import { useEffect } from "react";
import { useTypedSelector } from "../store/rootReducer";
import { recoverAppFromStorage } from "../services/AppService";
import { LoadingStatus } from "mdb-core-js";
import { RecoveringFromStorageImage } from "../components/RecoveringFromStorageImage";
import { CompanySelect } from "./company/CompanySelect";

export default function Index() {
  const loading = useTypedSelector(state => state.loading);

  useEffect(() => {
    recoverAppFromStorage();
  }, []);


  if (loading.recoverInitState === LoadingStatus.LOADING
          || loading.recoverInitState === LoadingStatus.INIT) {
          return <RecoveringFromStorageImage />
      } else {
          return <CompanySelect />;
      }
}
