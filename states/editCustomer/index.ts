import { create } from "zustand";
import { EditCustomerStore, IEditCustomerArgs, IEditFormData } from "./types";
import { initialState } from "./initialState";
import { uploadRepository, userRepository } from "@/repositories";
import { ICustomerModel } from "@/models";

export default create<EditCustomerStore>((set) => {
  const getCustomerById = async (id: string) => {
    const { data, status } = await userRepository.getUserbyId<ICustomerModel>(
      id
    );
    if (status == "success" && data.length !== 0) {
      return set(() => {
        return {
          editFormData: {
            name: data[0].name,
            contactNumber: data[0].contactNumber,
            address: data[0].address,
          },
          image: data[0].image,
        };
      });
    }
  };

  const setEditFormData = (form: IEditFormData) => {
    return set(() => ({
      editFormData: form,
    }));
  };

  const uploadImage = async (form: FormData) => {
    const { data, status } = await uploadRepository.uploadImage(form);
    if (status == "success") {
      return set(() => ({
        image: data[0].path ?? "",
      }));
    }
  };

  const updateCustomer = async (id: string, body: IEditCustomerArgs) => {
    const { data, status, message } =
      await userRepository.updateUser<ICustomerModel>(id, {
        ...body,
        __t: "Customer",
      });

    if (status == "success" && data.length !== 0) {
      return set(() => ({
        editSuccess: true,
      }));
    }
  };

  const reset = () => {
    return set(() => ({
      ...initialState,
    }));
  };

  return {
    getCustomerById,
    reset,
    updateCustomer,
    uploadImage,
    setEditFormData,
    ...initialState,
  };
});
