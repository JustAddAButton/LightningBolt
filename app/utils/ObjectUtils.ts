export const ObjectUtils = {
  isObjectEmpty(obj: any) {
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        return false;
      }
    }

    return true;
  },
};
