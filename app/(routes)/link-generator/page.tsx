"use client";

import DataTable from "@/app/(routes)/link-generator/components/data-tabe";
import GeneratorForm from "./components/generator-form";
import { Link, linkState } from "@/stores/links";
import { useAuth } from "@clerk/nextjs";
import { Box } from "@mui/material";
import axios from "axios";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import isUrl from "is-url";
import { toast } from "react-hot-toast";

const LinkGeneratorPage = () => {
  const [postLoading, setPostLoading] = useState<boolean>(false);
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);
  const { userId } = useAuth();
  const { addLink, links, setLinks, removeLink } = linkState();

  const onSubmit = async (url: string) => {
    setPostLoading(true);
    try {
      if (!userId) {
        throw new Error("Unauthorized");
      }
      console.log(isUrl(url));

      if (!isUrl(url)) {
        toast.error("Please enter a valid url");
        throw new Error("Invalid URL");
      }

      const linkKey: string = nanoid(11);
      const newLink: Link = {
        linkKey,
        routerLink: `${window.origin}/${linkKey}`,
        src: url,
        creatorId: userId,
      };

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/links`, {
        data: {
          ...newLink,
        },
      });

      addLink(newLink);
      toast.success("Generated link successfully");
    } catch (error) {
      console.log("NEW_LINK_SUBMIT_ERROR: ", error);
    } finally {
      setPostLoading(false);
    }
  };

  const getLinks = async () => {
    setFetchLoading(true);

    try {
      const links = (await axios(
        `${process.env.NEXT_PUBLIC_API_URL}/api/links?filters[creatorId][$eq]=${userId}&sort=updatedAt:desc`
      ).then((res) =>
        res.data.data.map((link: any) => ({ id: link.id, ...link.attributes }))
      )) as Link[];

      console.log(links);
      setLinks(links);
    } catch (error) {
      console.log("GET_LINKS_ERROR: ", error);
    } finally {
      setFetchLoading(false);
    }
  };

  const deleteLink = async (id: number) => {
    try {
      removeLink(id);
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/links/${id}`);
      toast.success("Deleted link successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      <GeneratorForm onSubmit={onSubmit} loading={postLoading} />
      <DataTable data={links} deleteLink={deleteLink} loading={fetchLoading} />
    </Box>
  );
};

export default LinkGeneratorPage;
