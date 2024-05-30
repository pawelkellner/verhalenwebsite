"use client";
import { useRouter } from "next/navigation";
import { useState } from 'react';

import styles from "../../app/story/page.module.scss";

import Button from "../button";
import Paragraph from "../typography/paragraph";
import LinkButton from "../link-button/link-button";

import { approveStory } from "../../app/actions";
import { disApproveStory } from "../../app/actions";
import { deleteStory } from "../../app/actions";

const AdminButtons = ({ slug, story }) => {
  const [awaitConfirmation, setAwaitConfirmation] = useState(false);
  const router = useRouter();

  const approved = async () => {
    await approveStory(story);
    router.push("/admin/review");
  };

  const awaitDisapproval = async () => {
    setAwaitConfirmation(true);
  };

  const disapproved = async () => {
    story?.underReview
      ? await deleteStory(story)
      : await disApproveStory(story);

    router.push("/admin/review");
  };

  const cancelDisapproval = () => {
    setAwaitConfirmation(false);
  };

  return (
    <div className={styles.story__buttons}>
      {awaitConfirmation ? (
        <>
          <Paragraph>Weet je zeker dat je dit verhaal wilt verwijderen?</Paragraph>
          <Button onClick={() => disapproved()} variant="warning">
            Verwijderen
          </Button>
          <Paragraph></Paragraph>
          <Button onClick={() => cancelDisapproval()} variant="secondary">
            Terug
          </Button>
        </>
      ) : (
        <>
          {story?.underReview && (
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
          <Paragraph>Of</Paragraph>
          <Button onClick={() => awaitDisapproval()} variant="warning">
            Verwijderen
          </Button>
        </>
      )}
    </div>
  );
};

export default AdminButtons;
