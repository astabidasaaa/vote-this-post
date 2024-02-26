import React, { useEffect } from "react";

type Props = {};

const Timeline = (props: Props) => {
  let test;
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const posts = await fetch("/api/post", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await posts.json();
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, []);

  return (
    <div className="w-full flex flex-col justify-start items-center">
      Timeline
    </div>
  );
};

export default Timeline;
