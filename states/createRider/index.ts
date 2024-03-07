import { create } from "zustand";
import {
  CreateRiderStore,
  ICreateRiderArgs,
  ICreateFormData,
  UploadGcash,
  UploadImage,
  UploadLicense,
  UploadSeminarCert,
} from "./types";
import { initialState } from "./initialState";
import { uploadRepository, userRepository } from "@/repositories";

export default create<CreateRiderStore>((set) => {
  const setCreateFormData = (form: ICreateFormData) => {
    return set(() => ({
      createFormData: form,
    }));
  };

  const createRider = async (body: ICreateRiderArgs) => {
    const { data, status } = await userRepository.createUser({
      ...body,
      __t: "Rider",
    });
    if (status == "success" && data.length !== 0) {
      return set(() => ({
        createSuccess: true,
      }));
    }
  };

  const uploadImage: UploadImage = async (form: FormData) => {
    const { data, status } = await uploadRepository.uploadImage(form);
    if (status == "success") {
      return set(() => ({
        image: data[0].path ?? "",
      }));
    }
  };

  const uploadGcash: UploadGcash = async (form: FormData) => {
    const { data, status } = await uploadRepository.uploadImage(form);
    if (status == "success") {
      return set(() => ({
        gcashQr: data[0].path ?? "",
      }));
    }
  };

  const uploadLicense: UploadLicense = async (form: FormData) => {
    const { data, status } = await uploadRepository.uploadImage(form);
    if (status == "success") {
      return set(() => ({
        license: data[0].path ?? "",
      }));
    }
  };

  const uploadSeminarCert: UploadSeminarCert = async (form: FormData) => {
    const { data, status } = await uploadRepository.uploadImage(form);
    if (status == "success") {
      return set(() => ({
        seminarCert: data[0].path ?? "",
      }));
    }
  };

  const reset = () => {
    return set(() => ({
      ...initialState,
    }));
  };

  return {
    uploadGcash,
    uploadLicense,
    uploadSeminarCert,
    uploadImage,
    reset,
    createRider,
    setCreateFormData,
    ...initialState,
  };
});
