import Markdown from "react-markdown";
// import MyCodeBlock from "./MyCodeBlock";
import { useEffect } from "react";
import { Typography } from "antd";

const { Title, Paragraph, Text, Link } = Typography;

export interface MyMarkdownProps {
  content?: string;
}

export default function MyMarkdown({ content }: MyMarkdownProps) {
  useEffect(() => {
    import("highlight.js/styles/github.css");
  }, []);

  return (
    <Markdown
      components={{
        h1: (props) => (
          <Title
            level={1}
            {...props}
            style={{ color: "white", ...props.style }}
            id={props.children?.toString().toLowerCase()}
          />
        ),
        h2: (props) => (
          <Title
            level={2}
            {...props}
            style={{ color: "white", ...props.style }}
            id={props.children?.toString().toLowerCase()}
          />
        ),
        h3: (props) => (
          <Title
            level={3}
            {...props}
            style={{ color: "white", ...props.style }}
            id={props.children?.toString().toLowerCase()}
          />
        ),
        h4: (props) => (
          <Title
            level={4}
            {...props}
            style={{ color: "white", ...props.style }}
            id={props.children?.toString().toLowerCase()}
          />
        ),
        h5: (props) => (
          <Title
            level={5}
            {...props}
            style={{ color: "white", ...props.style }}
            id={props.children?.toString().toLowerCase()}
          />
        ),
        p: (props) => (
          <Paragraph {...props} style={{ color: "white", ...props.style }} />
        ),
        span: (props) => (
          <Text {...props} style={{ color: "white", ...props.style }} />
        ),
        a: (props) => <Link href={props.href}>{props.children}</Link>,
        ul: (props) => <ul {...props} className="list-disc mb-2 list-inside" />,
        // ol: (props) => (
        //   <List {...props} type="ordered" className="list-decimal" />
        // ),
        // li: (props) => <List.Item {...props} />,
        code: (props) => <Text code {...props} />,
        // pre: (props) => <MyCodeBlock {...props} />,
      }}
    >
      {content}
    </Markdown>
  );
}
