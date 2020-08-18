import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
interface Repository {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await axios
    .get("https://api.github.com/users/riansaunders/repos", {
      auth: GITHUB_OAUTH,
    })
    .then((resp: AxiosResponse<Repository[]>) => resp.data)
    .catch((reason) =>
      console.log(
        `Failed to grab the github repositories with reason ${reason}`
      )
    );
  return {
    props: { data },
  };
};

const GITHUB_OAUTH = {
  username: "riansaunders",
  password: process.env.GITHUB_TOKEN,
};

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Rian Saunders</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="navcontainer">
        <nav className="navbar navbar-expand-sm">
          <a className="navbar-brand" href="/">
            Rian Saunders
          </a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/Resume Rian Saunders.pdf">
                  Resume
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://github.com/riansaunders">
                  Github
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://linkedin.com/in/rnsaunders"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className={styles.container}>
        <div className="row">
          <div className="col" style={{ top: "-1.5em" }}>
            <div className="text-center">
              <img src="/person.png" className={styles.heroImg} />
            </div>
            <h4 className="mt-4">About Me</h4>
            <p className="mt-1">
              My name is Rian Saunders. I'm a code weaver who loves engineering
              solutions. I've been at it since 2007 and been involved with many
              industries such as gaming(mmorpg), finance, and ecommerce to name
              a few.
            </p>
            <a className="btn mt-2" href="/Resume Rian Saunders.pdf">
              View My Resume
            </a>
          </div>
          <div className="col">
            <div className={styles.sectionHeader}>
              <h5>⚡ Interactive Projects</h5>
            </div>
            <Link href="/">
              <a>
                <div className={styles.sectionContent}>
                  <div className="mb-1">
                    <span className={styles.sectionTitle}>ZOA</span>
                    <span className={styles.sectionSubTitle}>
                      Scripting Language & Interpreter
                    </span>
                  </div>
                  <p>
                    My second attempt at creating a programming/scripting
                    language. This coming off the lessons I've learned from my
                    first venture, Botscript and all the tribulations that went
                    with it.
                  </p>
                </div>
              </a>
            </Link>
            <hr />
            <Link href="https://holdmynote.com">
              <a>
                <div className={styles.sectionContent}>
                  <div className="mb-1">
                    <span className={styles.sectionTitle}>HoldMyNote</span>
                    <span className={styles.sectionSubTitle}>
                      Full Stack Application
                    </span>
                  </div>
                  <p>
                    A full stack application that demonstrates GRAPHQL and CRUD
                    usage. Uses MongoDB, React and Node. Available on GitHub.
                  </p>
                  <div className={styles.techContainer}>
                  </div>
                </div>
              </a>
            </Link>
            <hr />
          </div>
          <div className="col">
            <div className={styles.sectionHeader}>
              <a href="https://github.com/riansaunders">
                <h5>
                  <img src="/github.svg" className="mr-1" alt="github" />
                  Repositories
                </h5>
              </a>
            </div>
            {!data && <h4>Loading...</h4>}
            <div className={styles.sectionContentContainer}>
              {data &&
                data.map((repo) => {
                  return !repo.language ? (
                    <></>
                  ) : (
                    <>
                      <div className={styles.sectionContent}>
                        <a
                          href={repo.html_url}
                          style={{ textDecoration: "none" }}
                        >
                          <div className="mb-1">
                            <span className={styles.sectionTitle}>
                              {repo.name}
                            </span>
                            <span className={styles.sectionSubTitle}>
                              {repo.language}
                            </span>
                          </div>
                          <p>{repo.description}</p>
                          <hr />
                        </a>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
