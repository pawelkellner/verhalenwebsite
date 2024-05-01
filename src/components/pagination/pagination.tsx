"use client";
import React, { useEffect, useState } from "react";

import styles from "./pagination.module.scss";

import Button from "../button";
import { DoubleArrow } from "../svg/double-arrow";
import { theme } from "../../theme";

const Pagination = ({
  initialIndex,
  onIndexChange,
}: {
  initialIndex?: number;
  onIndexChange?: (value: number) => void;
}) => {
  const [index, setIndex] = useState(initialIndex ? initialIndex : 1);

  useEffect(() => {
    onIndexChange && onIndexChange(index);
  }, [index]);

  return (
    <div className={styles.buttons}>
      <Button onClick={() => setIndex(1)}>
        <DoubleArrow
          color={index === 1 ? theme.grey[300] : theme.grey[400]}
          direction="left"
        />
      </Button>
      <Button
        variant={index === 1 ? "disabled" : "neutral"}
        onClick={() => setIndex(index - 1)}
      >
        Vorige
      </Button>
      <div className={styles.buttons__numbers}>
        <span>{index > 1 ? index - 1 : " "}</span>
        <span>{index}</span>
        <span>{index + 1}</span>
      </div>
      <Button variant="secondary" onClick={() => setIndex(index + 1)}>
        Volgende
      </Button>
      <Button onClick={() => setIndex(10)}>
        <DoubleArrow color={theme.grey[400]} direction="right" />
      </Button>
    </div>
  );
};

export default Pagination;
