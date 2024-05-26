"use client";
import { useRouter } from "next/navigation";

import styles from "../../app/story/page.module.scss";

import Button from "../button";
import Paragraph from "../typography/paragraph";
import LinkButton from "../link-button/link-button";

import { approveStory } from "../../app/actions";
import { deleteStory } from "../../app/actions";

const AdminButtons = ({ slug, story }) => {
  const router = useRouter();

  const approved = async () => {
    await approveStory(story);
    router.push("/admin/review");
  };

  const disapproved = async () => {
    await deleteStory(story);
    router.push("/admin/review");
  };

  return (
    <div className={styles.story__buttons}>
      {story.underReview && (
        <>
          <Button onClick={() => approved()} variant="primary">
            Goedkeuren
          </Button>
          <Paragraph>Of</Paragraph>
        </>
      )}
      <LinkButton href={`/admin/review/edit/${slug}`} buttonVariant="secondary">
        Bewerken
      </LinkButton>
      {/*{ !story.underReview  && (*/}
      <>
        <Paragraph>Of</Paragraph>
        <Button onClick={() => disapproved()} variant="warning">
          Afkeuren
        </Button>
      </>
      {/*)}*/}
    </div>
  );
};

export default AdminButtons;
