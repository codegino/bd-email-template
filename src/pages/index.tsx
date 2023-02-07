import {useState} from 'react';

const IndexPage = () => {
  const [imgSrc, setImgSrc] = useState<string>(
    'https://drive.google.com/uc?export=view&id=1qDPt-6n2K0cwkCpScSjwq2eogVy3eFuN',
  );
  const [name, setName] = useState<string>('');

  const handleClick = async () => {
    const responseHtml = await fetch('/api/email-template', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imgSrc,
        name,
      }),
    }).then(res => res.text());

    const myWindow = window.open('', 'response', 'resizable=yes');
    myWindow.document.write(responseHtml);
  };

  return (
    <main
      title="Home | Next.js + TypeScript Example"
      className="flex flex-col gap-2 p-4"
    >
      <input
        placeholder="Image URL"
        className="border-2 border-black"
        type="text"
        value={imgSrc}
        onChange={e => setImgSrc(e.target.value)}
      />

      <input
        placeholder="Name"
        className="border-2 border-black"
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={handleClick}>Click me</button>
    </main>
  );
};

export default IndexPage;
