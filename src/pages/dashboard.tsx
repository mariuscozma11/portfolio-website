import { useState, useEffect } from "react";
import { useAuth } from "../contexts/auth-provider";
import SectionWrapper from "../components/section-wrapper";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import api from "../services/api";

interface Post {
  PostID: string;
  Title: string;
  Content: string;
  CreatedAt: string;
}

interface CreatePostRequest {
  title: string;
  content: string;
}
import { LogOut, Plus, Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

const DashboardPage = () => {
  const { logout } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Fetch posts
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/posts");
      setPosts(response.data || []);
    } catch (err) {
      setError("Failed to fetch posts");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Open dialog for new post
  const handleNewPost = () => {
    setEditingPost(null);
    setTitle("");
    setContent("");
    setIsDialogOpen(true);
  };

  // Open dialog for editing post
  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setTitle(post.Title);
    setContent(post.Content);
    setIsDialogOpen(true);
  };

  // Save post (create or update)
  const handleSavePost = async () => {
    if (!title || !content) {
      return;
    }

    setIsSaving(true);
    try {
      const postData: CreatePostRequest = { title, content };

      if (editingPost) {
        await api.patch(`/posts/${editingPost.PostID}`, postData);
      } else {
        await api.post("/posts", postData);
      }

      setIsDialogOpen(false);
      fetchPosts();
    } catch (err) {
      console.error("Failed to save post:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // Delete post
  const handleDeletePost = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      await api.delete(`/posts/${postId}`);
      fetchPosts();
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  return (
    <SectionWrapper>
      <div className="min-h-screen px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-mono text-foreground">Dashboard</h1>
            <p className="text-muted-foreground font-mono text-sm mt-1">
              Manage your blog posts
            </p>
          </div>
          <Button
            variant="outline"
            onClick={logout}
            className="font-mono border-dashed"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Actions */}
        <div className="mb-6">
          <Button onClick={handleNewPost} className="font-mono">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>

        {/* Posts List */}
        {isLoading ? (
          <div className="text-muted-foreground font-mono text-center py-12">
            Loading posts...
          </div>
        ) : error ? (
          <div className="text-destructive font-mono text-center py-12">
            {error}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-muted-foreground font-mono text-center py-12 border border-dashed rounded-lg">
            No posts yet. Create your first post!
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.PostID}
                className="border rounded-lg p-4 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-mono text-lg text-foreground truncate">
                      {post.Title}
                    </h3>
                    <p className="font-mono text-sm text-muted-foreground mt-1 line-clamp-2">
                      {post.Content}
                    </p>
                    <p className="font-mono text-xs text-muted-foreground mt-2">
                      {new Date(post.CreatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEditPost(post)}
                      className="border-dashed"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeletePost(post.PostID)}
                      className="border-dashed hover:border-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-mono">
                {editingPost ? "Edit Post" : "New Post"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="block font-mono text-sm text-muted-foreground mb-2">
                  Title
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="font-mono"
                  placeholder="Post title"
                />
              </div>

              <div>
                <label className="block font-mono text-sm text-muted-foreground mb-2">
                  Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full min-h-[200px] px-3 py-2 rounded-md border border-input bg-background font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Write your post content..."
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="font-mono border-dashed"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSavePost}
                  disabled={isSaving || !title || !content}
                  className="font-mono"
                >
                  {isSaving ? "Saving..." : editingPost ? "Update" : "Create"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </SectionWrapper>
  );
};

export default DashboardPage;
