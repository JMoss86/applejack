import React, { Component } from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
/*import moment from "moment";*/
/*import { DiscussionEmbed } from "disqus-react";*/

import Layout from "../components/layout";
import SEO from "../components/seo";

function Form() {
  return (
    <form
      action={`https://formspree.io/maydrwrn`}
      name="contact"
      method="POST"
      data-netlify="true"
    >
      <div>
        <label>
          Your Name: <input type="text" name="name" required />
        </label>
      </div>
      <div>
        <label>
          Your Email: <input type="email" name="email" required />
        </label>
      </div>
      <div>
        <label>
          Message: <textarea name="message" required></textarea>
        </label>
      </div>
      <div>
        <button type="submit">Send</button>
      </div>
    </form>
  );
}

function Nothing() {
  return <div></div>;
}

function FormDisplay(props) {
  const showForm = props.showForm;
  if (showForm) {
    return <Form />;
  }
  return <Nothing />;
}

export default class blogPost extends Component {
  render() {
    const data = this.props.data.contentfulBlogs;
    const disqusShortname = "Applejacks";
    const disqusConfig = {
      identifier: data.id,
      title: data.title,
    };
    const siteurl = this.props.data.contentfulSiteInformation.siteUrl + "/";
    const twiteerhandle = this.props.data.contentfulSiteInformation
      .twiteerHandle;
    const socialConfigss = {
      site: {
        siteMetadata: { siteurl, twiteerhandle },
      },
      title: data.title,
      slug: data.slug,
    };
    const displayForm = this.props.data.contentfulBlogs.showForm;

    return (
      <Layout>
        <SEO
          title={data.title}
          keywords={[
            `Applejack's Ranch`,
            `Applejack's Ranch`,
            `Therapy Ranch`,
            `${data.title}`,
          ]}
        />
        <div className="site-container blog-post">
          <div className="container">
            {data.featureImage ? (
              <Img
                className="feature-img"
                fixed={data.featureImage.fluid}
                objectFit="cover"
                objectPosition="50% 50%"
              />
            ) : (
              <div className="no-image"></div>
            )}
            <div className="details">
              <h1 className="title">{data.title}</h1>
              {/*<span className="date">
                <i class="fas fa-calendar-alt"></i>{" "}
                {moment(data.createdAt).format("LL")}
              </span>*/}
              <div
                dangerouslySetInnerHTML={{
                  __html: data.description.childMarkdownRemark.html,
                }}
              />
            </div>
            {/*<Share
              socialConfig={{
                ...socialConfigss.site.siteMetadata.twiteerhandletitle,
                config: {
                  url: `${siteurl}${socialConfigss.slug}`,
                  title: `${socialConfigss.title}`,
                },
              }}
            />
                        <DiscussionEmbed
              shortname={disqusShortname}
              config={disqusConfig}
            />*/}

            {data.showForm ? <Form /> : <Nothing />}
          </div>
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query SinglePostQuery($slug: String!) {
    contentfulBlogs(slug: { eq: $slug }) {
      id
      title
      slug
      featureImage {
        fluid(maxWidth: 1500) {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      }
      description {
        childMarkdownRemark {
          html
        }
      }
      showForm
    }
    contentfulSiteInformation {
      siteUrl
      twiteerHandle
    }
  }
`;
