type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="markdown" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
