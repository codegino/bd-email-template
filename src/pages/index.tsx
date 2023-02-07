import EmailBuilderForm from '../components/EmailBuilderForm';

const IndexPage = () => {
  return (
    <main
      title="Home | Next.js + TypeScript Example"
      className="flex flex-col gap-2 p-4"
    >
      <EmailBuilderForm />
    </main>
  );
};

export default IndexPage;
