"use client";

import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  HeartIcon,
  Share2Icon,
  ThickArrowDownIcon,
  ThickArrowUpIcon,
} from "@radix-ui/react-icons";

type DataContent = {
  candidates: {
    candidateBody: string;
    // voter: string[];
    voterCount: number;
  }[];
  createdAt: string;
  postBody: String;
  postId: string;
  totalDownVotes: string;
  totalSaves: string;
  totalUpVotes: string;
  totalVoters: string;
  userId: string;
  username: string;
  _id: string;
};

const queryClient = new QueryClient();

const Timeline = () => {
  // const [content, setContent] = useState<DataContent[]>([]);
  // const [lastUpdateTimestamp, setLastUpdateTimestamp] = useState<String>("");

  // let test;
  // useEffect(() => {
  //   const fetchPost = async () => {
  //     try {
  //       const posts = await fetch(`/api/post?since=${lastUpdateTimestamp}`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       const newData = await posts.json();
  //       // console.log(newData);
  //       setContent((prevContent) => [...prevContent, ...newData]);

  //       if (newData.length > 0) {
  //         setLastUpdateTimestamp(newData[newData.length - 1].createdAt);
  //       }
  //       // console.log(result);
  //     } catch (error) {
  //       console.error("Error fetching updates:", error);
  //     }
  //   };

  //   // const pollingInterval = setInterval(() => {
  //   //   fetchPost();
  //   // }, 10000);

  //   fetchPost();

  //   // return () => clearInterval(pollingInterval);
  // }, [lastUpdateTimestamp]);

  // useEffect(() => {
  //   const fetchPost = async () => {
  //     try {
  //       const posts = await fetch(`/api/post`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       const newData = await posts.json();

  //       setContent([...newData]);

  //       if (newData.length > 0) {
  //         setLastUpdateTimestamp(newData[newData.length - 1].createdAt);
  //       }
  //       // console.log(result);
  //     } catch (error) {
  //       console.error("Error fetching updates:", error);
  //     }
  //   };

  //   fetchPost();
  // }, []);

  // useEffect(() => {
  //   console.log(content);
  // }, [content]);

  return (
    <QueryClientProvider client={queryClient}>
      <TimelineFetch />
    </QueryClientProvider>
  );

  // return <div>Timeline</div>;
};

export default Timeline;

const TimelineFetch = () => {
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("/api/post").then((res) => res.json())
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error;

  console.log(data);

  // return <div>test</div>;
  return (
    <>
      <div className="w-full max-w-2xl flex flex-col justify-start items-center">
        {/* {data.map((item: { postBody: string }, index: string) => {
        return <p key={`post-${index}`}>{item.postBody}</p>;
      })} */}
        {data.map((post: DataContent, postIndex: number) => {
          const date = new Date(post.createdAt);

          const timeString = date.toLocaleTimeString("en-US", {
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
          });
          // const dateString = date.toLocaleString("en-GB");
          const dateString = date.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
          return (
            <article
              className="w-full max-w-xl py-8 px-4 border hover:bg-muted transition"
              key={`post-${post._id}`}
              role="button"
            >
              <div className="text-base flex flex-col justify-start items-start">
                {post.username && (
                  <div className="w-full">
                    <span className="font-semibold">{post.username}</span>
                  </div>
                )}

                {post.postBody && (
                  <div className="w-full">
                    <span>{post.postBody}</span>
                  </div>
                )}
                {post.candidates?.length !== 0 && (
                  <div className="w-full flex flex-col gap-2 my-4">
                    {post.candidates.map((candidate, candidateIndex) => {
                      return (
                        <div
                          key={`${post._id}-${candidateIndex}`}
                          className="rounded-md border px-4 py-2 text-sm flex flex-row justify-between items-center"
                        >
                          <span>{candidate.candidateBody}</span>
                          <span>{candidate.voterCount}%</span>
                        </div>
                      );
                    })}
                  </div>
                )}
                {post.createdAt && (
                  <div className="w-full">
                    <time
                      dateTime={post.createdAt}
                      className="text-xs text-muted-foreground text-end"
                    >
                      {`${timeString} ⋅ ${dateString}`}
                    </time>
                  </div>
                )}
              </div>
              <Separator className="my-2" />
              <div className="flex flex-row justify-between items-start">
                <div className="flex flex-row justify-start items-start gap-2">
                  <Button
                    variant="ghost"
                    // size="icon"
                    className="text-muted-foreground rounded-full flex flex-row gap-1"
                  >
                    <ThickArrowUpIcon className="h-4 w-4" />{" "}
                    <span>{post.totalUpVotes}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    // size="icon"
                    className="text-muted-foreground rounded-full flex flex-row gap-1"
                  >
                    <ThickArrowDownIcon className="h-4 w-4" />
                    <span>{post.totalDownVotes}</span>
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  // size="icon"
                  className="text-muted-foreground rounded-full flex flex-row gap-1"
                >
                  <HeartIcon className="h-4 w-4" />
                  <span>{post.totalSaves}</span>
                </Button>
                <Button
                  variant="ghost"
                  // size="icon"
                  className="text-muted-foreground rounded-full flex flex-row gap-1"
                >
                  <Share2Icon className="h-4 w-4" />
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
};
