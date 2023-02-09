import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { GiCakeSlice } from 'react-icons/gi';
import { GoPrimitiveDot } from 'react-icons/go';
import { useParams, Link } from 'react-router-dom';
import cover_image from '../../images/Cover-Image.jpg';
import reddit_logo from '../../images/reddit-logo.png'
import AboutCommunity from '../Community/AboutCommunity';
import RulesCommunity from '../Community/RulesCommunity';

const CommunityDetails = ({ post, isBanned }) => {

  let { community_id } = useParams();

  useEffect(() => {
    let mounted = true;

    return () => (mounted = false);
  }, []);

  return (
    <div>
      <AboutCommunity community={post.community} isBanned={isBanned} postShow={true} />
      <RulesCommunity community={post.community} />
    </div>
  )
}

export default CommunityDetails
