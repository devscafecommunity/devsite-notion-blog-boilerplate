/*
data: 

{
  "id": "7fbdcbf1-de6c-472b-b35a-e4c3dbbe22ab",
  "name": "Pedro Kaleb de Jesus",
  "bio": "Test",
  "avatar": "https://i.imgur.com/SL6jvOr.png",
  "banner": "https://i.imgur.com/UxNDPFP.png",
  "social": {
    "github": "https://github.com/LyeZinho",
    "instagram": "https://instagram/pedrokj",
    "website": "https://pedrokalebdev.pt",
    "linkedin": "linkedin.com/pedrojesus",
    "twitter": "https://x.com/PeJesus"
  },
  "posts": [
    {
      "id": "e3b7d032-44bd-4a77-8fef-6472617d5c21",
      "title": "Titulo do post",
      "description": "Descrição do post etc…",
      "cover": "https://i.imgur.com/SL6jvOr.png",
      "slug": "test",
      "tags": [
        "test"
      ],
      "created_time": "2024-09-07T19:02:00.000Z",
      "last_edited_time": "2024-09-09T09:27:00.000Z",
      "author": {
        "id": "2439e043-c4de-4dac-8bca-225299af2a76",
        "name": "Pedro Kaleb De Je1",
        "avatar": "",
        "banner": "",
        "email": "pedrokalebdej1@gmail.com"
      },
      "content": []
    }
  ]
}
*/

// Chakra
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Text, Heading, Divider } from "@chakra-ui/react";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Tag, Input } from "@chakra-ui/react";


// Motion
import { motion } from "framer-motion";

// React
import { use, useEffect, useState } from "react";


// Icons
import { 
    FaGithub,
    FaInstagram,
    FaGlobe,
    FaLinkedin,
    FaTwitter,
 } from "react-icons/fa";



export default function AuthorPostHeader ( { data }: { data: any } ) {
  return (
    <div className="flex flex-col items-center justify-center">
      {data.social.linkedin}
      {data.social.twitter}
      {data.social.github}
    </div>
  )
}