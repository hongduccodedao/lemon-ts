import icons from "@/utils/icons";
import * as apis from "@/apis";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const {
  RiBookmarkLine,
  RiBookmarkFill,
} = icons;

interface Props {
  isSaved: boolean;
  setIsSaved: React.Dispatch<React.SetStateAction<boolean>>;
  pid: string;
}

const Save = ({isSaved, setIsSaved, pid}: Props) => {
  const { isLogged } = useSelector((state: any) => state.user);

  const handleSave = async () => {
    if (!isLogged) return toast.error("You must login to save this post");
    try {
      if (!isSaved) {
        const response = await apis.apiSavePost(pid, true);
        if (response) {
          setIsSaved(true);
        }
      } else {
        const response = await apis.apiSavePost(pid, false);
        if (response) {
          setIsSaved(false);
        }
      }
    } catch (error) {
      console.log("🚀 ~ handleSave ~ error:", error);
    }
  };

  return (
    <div onClick={handleSave}>
      {isSaved ? (
        <div
          className="flex flex-col gap-2 items-center cursor-pointer"
          
        >
          <RiBookmarkFill className="text-2xl text-ctp-mauve" />
        </div>
      ) : (
        <div
          className="flex flex-col gap-2 items-center cursor-pointer"
        >
          <RiBookmarkLine className="text-2xl" />
        </div>
      )}
    </div>
  );
};

export default Save;
