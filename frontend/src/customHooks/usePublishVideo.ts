import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";

interface Video {
  _id: string;
  videoFile: {
    url: string;
    public_id: string;
    _id: string;
  };
  thumbnail: {
    url: string;
    public_id: string;
    _id: string;
  };
  title: string;
  description: string;
  duration: number;
  views: string[];
  isPublished: boolean;
  owner: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface PublishVideoResponse {
  statusCode: number;
  data: Video;
  message: string;
  success: boolean;
}

interface ErrorReponse {
  message: string;
}

interface PublishData {
  thumbnail: File;
  videoFile: File;
  title: string;
  description: string;
}

const usePublishVideo = (): UseMutationResult<
  PublishVideoResponse,
  ErrorReponse,
  PublishData
> => {
  const queryClient = useQueryClient();

  return useMutation<PublishVideoResponse, ErrorReponse, PublishData>({
    mutationFn: async ({
      thumbnail,
      videoFile,
      title,
      description,
    }: PublishData) => {
      const formData = new FormData();
      formData.append("thumbnail", thumbnail);
      formData.append("videoFile", videoFile);
      formData.append("title", title);
      formData.append("description", description);

      try {
        const response = await fetch("/api/v1/videos", {
          method: "POST",
          body: formData,
          credentials: "include",
        });
        if (!response.ok) {
          const error: ErrorReponse = await response.json();
          throw new Error(error.message);
        }
        const data: PublishVideoResponse = await response.json();
        console.log(data);

        return data;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        } else {
          throw "Error publishing the video";
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"], exact: false });
    },
  });
};

export default usePublishVideo;
