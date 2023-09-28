export interface ToastList {
  id: string;
  title: string;
  description: string;
  duration: number;
  variant: "default" | "destructive" | "success" | "info" | "warning" | undefined;
  actionText: string;
  action: Function;
  icon: string;
  altText: string;
}

export const useToast = () => {
  const toast = useState<Partial<ToastList> | null>("ToastList");
  const toastMap = new Map<string, Partial<ToastList> | null>();

  const add = async (data: Partial<ToastList>) => {
    toast.value = null;
    await new Promise((resolve) => setTimeout(resolve, 100));
    const id = data.id || new Date().getTime().toString();
    toast.value = {
      id,
      ...data,
    };
    toastMap.set(id, toast.value);

    const duration = data.duration || 5000;
    setTimeout(() => {
      toastMap.delete(id);
      if (toast.value && toast.value.id === id) {
        toast.value = null;
      }
    }, duration);
  };

  const removeToast = () => (toast.value = null);

  return { add, removeToast, toast };
};
