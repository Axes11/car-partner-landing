import React from "react";
import styled from "styled-components";
import Typography from "@/shared/ui/Typography";
import { COLORS } from "@/constants/Colors";
import ExpandableText from "@/components/Reviews/expandable-text"

export interface ReviewsProps {
  image: string;
  nickname: string;
  review: string;
}

const ReviewContainer = styled.div`
  max-width: 527px;
  background: ${COLORS.BACKGROUND};
  padding: 16px;
  border-radius: 12px;
  margin: 0 auto;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid ${COLORS.SECONDARY};
  padding-bottom: 12px;
`;

const UserImage = styled.img`
  width: 63px;
  height: 63px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserNickname = styled.div`
  color: ${COLORS.SECONDARY};
`;

const UserReview = styled.div`
  margin-top: 12px;
  color: ${COLORS.TEXT};
  line-height: 1.4;
`;

export default function ReviewCard({ image, nickname, review }: ReviewsProps) {
  return (
    <ReviewContainer>
      <UserInfo>
        <UserImage src={image} alt={nickname} />
        <UserNickname>
          <Typography variant="SUBTITLE" weight={500}>{nickname}</Typography>
        </UserNickname>
        
      </UserInfo>
      <Typography variant="TEXT" weight={400}>
        <UserReview>
        <ExpandableText text={review} limit={150} />
      </UserReview>
      </Typography>
    </ReviewContainer>
  );
}
