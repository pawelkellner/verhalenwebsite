"use client";
import { useRouter } from "next/navigation";

import styles from "../../app/story/page.module.scss";

import Button from "../button";
import Paragraph from "../typography/paragraph";
import LinkButton from "../link-button/link-button";

const AdminButtons = ({ slug }) => {
  const router = useRouter();

  const approved = () => {
    router.push("/admin/review");
  };

  const disapproved = () => {
    router.push("/admin/review");
  };

  return (
    <div className={styles.story__buttons}>
      <Button onClick={() => approved()} variant="primary">
        Goedkeuren
      </Button>
      <Paragraph>Of</Paragraph>
      <LinkButton href={`/admin/review/edit/${slug}`} buttonVariant="secondary">
        Bewerken
      </LinkButton>
      <Paragraph>Of</Paragraph>
      <Button onClick={() => disapproved()} variant="warning">
        Afkeuren
      </Button>
    </div>
  );
};

export default AdminButtons;
