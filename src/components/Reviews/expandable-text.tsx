import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "@/constants/Colors";
import { useLanguage } from "@/hooks/useLanguage";

interface ExpandableTextProps {
  text: string;
  limit?: number;
}

const Text = styled.p`
  color: ${COLORS.TEXT};
  line-height: 1.5;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: ${COLORS.ACCENT};
  cursor: pointer;
  padding: 0;
  transition: 0.2s ease;

`;

const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  limit = 150,
}) => {
  const [expanded, setExpanded] = useState(false);
  const language = useLanguage("expandableText");

  const showMoreText = language?.res?.showMore;
  const showLessText = language?.res?.showLess;

  if (text.length <= limit) {
    return <Text>{text}</Text>;
  }

  const displayText = expanded ? text : text.slice(0, limit) + "...";

  return (
    <div>
      <Text>
        {displayText}{" "}
        <Button onClick={() => setExpanded(!expanded)}>
          {expanded ? showLessText : showMoreText}
        </Button>
      </Text>
    </div>
  );
};

export default ExpandableText;
