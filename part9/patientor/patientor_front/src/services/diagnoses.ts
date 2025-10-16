import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diagnose } from "../../../shared/types";
import { toDiagnoses } from "../../../shared/utils";

export const getDiagnoses = async () => {
    const {data} = await axios.get(`${apiBaseUrl}/diagnoses`);
    const diagnoses: Diagnose[] = toDiagnoses(data);

    return diagnoses;
};

export default {getDiagnoses};