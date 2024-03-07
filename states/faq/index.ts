import { create } from "zustand";
import { FaqStore } from "./types";
import { faqRepository } from "@/repositories";
import { initialState } from "./initialState";

export default create<FaqStore>((set) => {
  const getFaqs = async ({ page = 1, limit = 10 }) => {
    const { data, status } = await faqRepository.getFaqs({
      page,
      limit,
    });
    if (status == "success") {
      return set(() => {
        return { faqs: data };
      });
    }
  };
  const removeFaq = async (id: string) => {
    const { status } = await faqRepository.deleteFaq(id);
    if (status == "success") {
      return set((state) => ({
        faqs: [...state.faqs.filter((e: any) => e._id != id)],
      }));
    }
  };
  const setLimit = (value: number) => {
    return set(() => ({
      limit: value,
    }));
  };
  const nextPage = () => {
    return set((state) => ({
      page: state.page + 1,
    }));
  };
  const previousPage = () => {
    return set((state) => {
      if (state.page > 1) {
        return {
          page: state.page - 1,
        };
      }
      return { ...state };
    });
  };
  return {
    getFaqs,
    removeFaq,
    setLimit,
    nextPage,
    previousPage,
    ...initialState,
  };
});
