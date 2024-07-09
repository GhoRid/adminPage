import { instance } from ".";

export const updateImage = (payload) => {
  return instance.post("", payload);
};
