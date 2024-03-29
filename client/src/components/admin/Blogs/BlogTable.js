import { Button, Table } from "reactstrap";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const BlogTable = ({ blogs, replace, history }) => {
  return (
    <Table bordered striped responsive className="mb-2 mt-2" size="sm">
      <thead>
        <tr className="text-center text-warning">
          <th>#</th>
          <th>Image</th>
          <th>Title</th>
          <th>Likes</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className="text-white">
        {blogs.reverse().map((blog, i) => (
          <tr key={blog._id} className="text-center">
            <td>{i + 1}</td>
            <td>
              <img
                src={blog.coverImg || replace}
                alt={blog._id}
                width="100"
                height="50"
              />
            </td>
            <td>{blog.title}</td>
            <td>{blog.likes.length}</td>
            <td>
              {new Date(blog.date).toDateString() +
                ", " +
                new Date(blog.date).toLocaleTimeString()}
            </td>

            <td>
              <Button
                color="primary"
                size="sm"
                className="py-1 px-2 shadow-sm"
                onClick={() => history.push(`/admin/blog/${blog._id}/`)}>
                <FaEdit size="14" /> Edit
              </Button>
              &nbsp;&nbsp;
              <Button color="danger" size="sm" className="py-1 px-2 shadow-sm">
                <MdDelete size="14" /> Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BlogTable;
