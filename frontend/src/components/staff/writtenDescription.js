import React, { useState, useRef } from 'react';
import Sidebar from '../staff/sidebar';
import { Modal, Button, Rate, Input, Radio } from 'antd';
import { StarFilled, CloseOutlined } from '@ant-design/icons';
import html2pdf from 'html2pdf.js';

const { TextArea } = Input;

const defaultDescription = [
  "Gulliver's Travels is a satirical novel by Jonathan Swift, first published in 1726. It is a critique of human nature and the 'travellers' tales' literary subgenre. The narrative follows Lemuel Gulliver's voyages to four remote nations, beginning with Lilliput, inhabited by tiny people, then Brobdingnag, a land of giants. The novel's enduring popularity is due in part to its richness in symbolic content and satirical intent, critiquing both the politics of its day and broader aspects of human nature. Throughout his journeys, Gulliver encounters diverse societies that expose the follies and vices of contemporary civilization. The detailed and imaginative descriptions of these societies continue to capture the readers' imaginations.",
  "In the first voyage, Gulliver finds himself shipwrecked on the island of Lilliput, where he is captured by its six-inch-tall inhabitants. The Lilliputians are initially hostile, but eventually, they grow to trust him and he learns about their intricate society, which is a satirical portrayal of the English court and political system. Swift uses the tiny Lilliputians to explore themes of power, corruption, and the pettiness of human nature. The absurdity of their conflicts and their trivial concerns are a reflection of the author's view on the unnecessary quarrels and disputes of contemporary European politics.",
  "The second voyage takes Gulliver to Brobdingnag, a land of giants, where he is reduced to the size of a Lilliputian in comparison. Here, Swift reverses the perspective, allowing Gulliver to experience what it is like to be tiny in a world of giants. The Brobdingnagians are portrayed as morally superior and more rational than the Europeans, highlighting the flaws and moral shortcomings of European society. Through Gulliver's interactions with the giants, Swift critiques human pride and the illusion of grandeur, showing how relative and arbitrary such concepts are. Gulliver's change in perspective serves to underscore the satirical nature of the novel.",
  "In the third voyage, Gulliver visits several islands, including Laputa, a floating island inhabited by theoretical scientists and philosophers whose impractical ideas and projects are a critique of the Royal Society and the overemphasis on abstract knowledge. The inhabitants are so absorbed in their intellectual pursuits that they are oblivious to the practical needs of their society. This part of the novel satirizes the disconnect between scientific advancement and real-world application, as well as the dangers of intellectual elitism. The absurdity of their inventions and the neglect of practical affairs serve as a humorous and biting critique of the scientific community of Swift's time.",
  "The final voyage takes Gulliver to the land of the Houyhnhnms, rational horses who live in a utopian society based on reason and truth. In contrast, the Yahoos, who resemble humans, embody all that is base and depraved in humanity. This stark dichotomy presents Swift's ultimate critique of human nature, contrasting the rationality and virtue of the Houyhnhnms with the corruption and vice of the Yahoos. Gulliver's increasing disillusionment with humanity reaches its peak in this part of the novel, leading him to reject human society and its values. The depiction of the Houyhnhnms' society challenges readers to reflect on the potential for rationality and virtue in their own lives."
];

const UserContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentDocumentIndex, setCurrentDocumentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState(""); // "success" or "reject"
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [decision, setDecision] = useState("");
  const pdfContentRef = useRef(null);
  const documents = [
    {
      coverImage: 'https://inasianspaces.com/wp-content/uploads/2022/09/classroom-of-the-elite-season-2-episode-12-chabashira-sensei-and-ayanokoji.png?w=1200',
      iconImage: 'https://avatars.githubusercontent.com/u/88388062?v=4',
      title: 'Sample Document'
    }
  ];

  const currentDocument = documents[currentDocumentIndex];

  const handleSubmit = () => {
    const feedback = {
      stars,
      comment,
      decision,
    };
    console.log("Feedback Submitted:", feedback);
    
    if (formType === "success") {
      const buttons = document.getElementById('actionButtons');
      buttons.style.display = 'none'; // Hide the buttons before generating the PDF

      const element = pdfContentRef.current;
      html2pdf()
        .set({
          margin: [2, 0, 3, 0], // 2cm top margin
          filename: 'document.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
        })
        .from(element)
        .save()
        .finally(() => {
          buttons.style.display = 'block'; // Show the buttons again after generating the PDF
        });

      alert("Document downloaded as PDF!");
    }

    setIsModalOpen(false);
    setStars(0);
    setComment("");
    setDecision("");
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center">
      <div className="absolute top-0 left-0 w-full" style={{ height: '1.5cm', backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
        <h1 className="text-2xl text-center font-bold text-gray-800 mr-2 mt-4">Write Your Own Ideas</h1>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          documents={documents}
          setCurrentDocumentIndex={setCurrentDocumentIndex}
          createPage={() => {}}
        />
      </div>

     
        {currentDocument.coverImage && (
          <div
            className="relative w-screen h-64 bg-cover bg-center mt-6 group"
            style={{ backgroundImage: `url(${currentDocument.coverImage})` }}
          >
            {currentDocument.iconImage && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-20 h-20">
                <img
                  src={currentDocument.iconImage}
                  alt="Icon"
                  className="absolute top-1/2 transform -translate-y-1/2 left-1/2 w-20 h-20 object-cover rounded-full border-4 border-white"
                />
              </div>
            )}
          </div>
        )}

      <div id="pdfContent" ref={pdfContentRef}>
        <main className={`flex flex-col h-full w-full mt-18 ${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
          <section className="flex flex-col flex-1 w-full">
            <div className="p-6 group flex flex-col shrink-0 px-10 md:px-24 w-full max-w-[900px] mx-auto relative pt-10">
              <h2 className="text-xl font-semibold mb-4">Gulliver's Travels</h2>
              {defaultDescription.map((paragraph, index) => (
                <p key={index} className="mb-4 text-justify">
                  {paragraph}
                </p>
              ))}
              <div id="actionButtons" className="flex space-x-4 mt-4">
                <button
                  onClick={() => {
                    setFormType("review");
                    setIsModalOpen(true);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Review
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>

    <Modal
      title="Provide Feedback"
      visible={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      closeIcon={<CloseOutlined />}
      className="w-full max-w-md mx-auto p-4 sm:p-6 md:p-8"
    >
      <div className="mb-6">
        <p className="mb-2 text-gray-700 font-medium">Stars:</p>
        <Rate
          count={5}
          value={stars}
          onChange={(value) => setStars(value)}
          character={<StarFilled />}
          className="text-yellow-400"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">
          Comment:
        </label>
        <TextArea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          placeholder="Enter your comment"
          className="w-full"
        />
      </div>
      <div className="mb-6">
          <p className="mb-2 text-gray-700 font-medium">Decision:</p>
          <Radio.Group onChange={(e) => setDecision(e.target.value)} value={decision}>
            <Radio value="Accepted">Accepted</Radio>
            <Radio value="Rejected">Rejected</Radio>
          </Radio.Group>
        </div>
      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
        <Button onClick={() => setIsModalOpen(false)} className="w-full sm:w-auto">
          Cancel
        </Button>
        <Button type="primary" onClick={handleSubmit} className="w-full sm:w-auto">
          Submit
        </Button>
      </div>
    </Modal>
    </div>
  );
};

export default UserContent;






