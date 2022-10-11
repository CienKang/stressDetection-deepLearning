import praw

class RedditPostFetcher():
    def __init__(self, reddit_client_id, reddit_client_secret, reddit_user_agent):
        self.reddit=praw.Reddit(client_id=reddit_client_id, 
            client_secret=reddit_client_secret, 
            user_agent=reddit_user_agent)
    
    def fetchPost(self, username):
        posts=[]
        redditor=self.reddit.redditor(username)
        for submission in redditor.submissions.top(time_filter="all"):
            posts.append(submission.selftext)
        return posts

    def fetchComments(self, username):
        comments=[]
        redditor=self.reddit.redditor(username)
        for comment in redditor.comments.new(limit=None):
            comments.append(comment.body)
        return comments

if __name__=="__main__":
    import os
    reddit=RedditPostFetcher(reddit_client_id=os.getenv("REDDIT_CLIENT_ID"),
        reddit_client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
        reddit_user_agent=os.getenv("REDDIT_USER_AGENT")
    )
    print(reddit.fetchPost("Dragon_Hunter67"))
    print(reddit.fetchComments("Dragon_Hunter67"))