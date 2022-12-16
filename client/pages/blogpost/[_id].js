import { gql } from "@apollo/client";
import { initializeApollo } from "../../lib/apolloClient"; 
import { GET_BLOGPOSTS_ADMIN,GET_BLOG_POST_BY_ID } from "../../utils/queries";

export async function getStaticPaths () {
    const client = initializeApollo();
 const {data} =  await client.query({
      query: GET_BLOGPOSTS_ADMIN
  });
const paths = data.getBlogposts.map(blogpost => {
    return {
        params: {_id: blogpost._id.toString() }
    }
})
  return {
     paths,
     fallback: false
  }
  
};

export async function getStaticProps(context) {
    const client = initializeApollo();
const _id = context.params._id;
const {data} = await client.query({
    
    query: GET_BLOG_POST_BY_ID ,variables:{_id: _id}
})
return {
    props: {blogPost: data}
}
};

export default function blogPost ({blogPost})  {
    console.log(blogPost);
return(
    <div><h1>single blogPost</h1></div>
);
};