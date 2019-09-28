import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

const posts = [
    {
        title: "My first post",
        excerpt: "This is my first post with more content inside",
        image: "https://bit.ly/2WNi2Ml"
       },
      
       {
        title: "My second post",
        excerpt: "This is my second post with more content inside",
        image: "https://bit.ly/2WNi2Ml"
       }
]

function Posts(props) {
  return (
    <div style={{ marginTop: 20, padding: 30 }}>
      <Grid container spacing={40} justify="center">
        {posts.map(post => (
          <Grid item key={post.title}>

          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Posts;