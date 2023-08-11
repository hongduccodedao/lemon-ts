import React, { useEffect, useState } from "react";
import * as apis from "@/apis";
import icons from "@/utils/icons";
import { toast } from "react-toastify";

const { RiCloseLine } = icons;
interface TagsPostProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagsPost: React.FC<TagsPostProps> = ({ tags, setTags }) => {
  const [inputTag, setInputTag] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any>([]);
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);
  const [isShowSuggestions, setIsShowSuggestions] = useState<boolean>(false);
  const [isShowInputTag, setIsShowInputTag] = useState<boolean>(true);

  const handleInputTag = (e: any) => {
    const inputValue = e.target.value;
    setInputTag(inputValue);

    const matchedSuggestions = suggestions.filter((suggestion: string) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase()),
    );

    setSelectedSuggestions(matchedSuggestions);
  };

  const handleCreateTag = (e: any) => {
    if (e.key === "Enter") {
      if (selectedSuggestions.length > 0) {
        setTags([...tags, ...selectedSuggestions]);
        setInputTag("");
        setSelectedSuggestions([]);
      } else {
        setTags([...tags, inputTag]);
        setInputTag("");
      }
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((item: string) => item !== tag));
  };

  const getSuggestions = async () => {
    try {
      const response = await apis.apiGetTags();
      setSuggestions(response);
    } catch (error) {
      toast.error("Failed to fetch tag suggestions");
    }
  };

  const handleSuggestion = (tag: string) => {
    setTags([...tags, tag]);
    setInputTag("");
    setSelectedSuggestions([]);
  };

  useEffect(() => {
    getSuggestions();
  }, []);

  useEffect(() => {
    if (tags.length > 0) {
      setIsShowInputTag(true);
    }
    if (tags.length > 3) {
      setIsShowInputTag(false);
      setIsShowSuggestions(false);
    }
  }, [tags]);

  return (
    <div
      className="relative w-full flex items-center gap-2"
      onBlur={() => setIsShowSuggestions(false)}
      onFocus={() => setIsShowSuggestions(true)}
    >
      <div className="flex flex-wrap gap-2">
        {tags.length > 0 &&
          tags.map((tag: string) => (
            <div
              key={tag}
              className="bg-ctp-surface1 text-white px-2 py-1 rounded-lg flex items-center gap-2"
            >
              <p>#{tag}</p>
              <button onClick={() => handleRemoveTag(tag)}>
                <RiCloseLine className="hover:text-ctp-red" />
              </button>
            </div>
          ))}
      </div>
      {isShowInputTag && (
        <input
          type="text"
          className="w-full bg-transparent flex-1 p-2 outline-none"
          placeholder="Add up to 4 tags..."
          value={inputTag}
          onChange={handleInputTag}
          onKeyDown={handleCreateTag}
        />
      )}

      {isShowSuggestions && (
        <div className="absolute top-10 left-0 w-full bg-ctp-surface1 rounded-lg shadow-lg z-10">
          {suggestions.map((tag: string) => (
            <div
              key={tag}
              className={`p-2 rounded-lg hover:underline cursor-pointer ${
                selectedSuggestions.includes(tag)
                  ? "bg-ctp-overlay1"
                  : "hover:bg-ctp-overlay1"
              }`}
              onClick={() => handleSuggestion(tag)}
            >
              <p>#{tag}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagsPost;
