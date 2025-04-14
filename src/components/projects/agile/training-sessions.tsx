const data = [
  {
    id: 1,
    name: 'Day 1: Empowering Master Trainers: A Journey into Digital Literacy',
    desc: `In the heart of the Adolescent Girls Initiative for Learning
                    Empowerment (AGILE) Project, a group of eager Master
                    Trainers gathered, each carrying a shared aspiration—to
                    bridge the digital divide and enhance their knowledge of
                    essential productivity tools. Over several immersive
                    sessions, guided by the experienced Mr. Olalekan Adeeko,
                    they embarked on a transformative journey into the world of
                    computers, Microsoft Word, and Microsoft PowerPoint on
                    interactive mode using simple to complex approach methods.
                    Participants were provided with some tasks and were grouped
                    for the purpose of the entire workshop activities`,
  },
  {
    id: 2,
    name: 'Day 2: Setting the Stage for Digital Proficiency',
    desc: `The training commenced with an introduction to computers and basic digital skills. Participants, drawn from diverse backgrounds, ranged from those with minimal exposure to technology to individuals seeking to refine their expertise. The primary goal was clear—to ensure every trainer walked away with a newfound confidence in navigating the digital landscape. This training was more than just an educational session; it was a gateway to empowerment, enabling participants to effectively train adolescent girls and foster digital literacy within their communities.`,
  },
  {
    id: 3,
    name: 'Day 3: Embracing Digital Transformation in Education',
    desc: 'The third day of the Adolescent Girls Initiative for Learning Empowerment (AGILE) Project training was a pivotal step in equipping Master Trainers with essential digital skills for modern teaching. The sessions, led by Mr. Olalekan Adeeko and Dr. Oluwakemi Olurinola, focused on virtual teaching platforms, remote learning strategies, multimedia content creation, and artificial intelligence tools in education. Participants engaged in interactive exercises, practical demonstrations, and collaborative discussions, reinforcing the importance of digital fluency in modern education.',
  },
  {
    id: 4,
    name: 'Day 4: Promoting Digital Etiquette and Safety and Climate Change Education: A Call to Action',
    desc: 'The day began with Mr. Olalekan Adeeko leading a session on Digital Etiquette and Safety. This session emphasized online communication best practices, cybersecurity essentials, and student digital citizenship. Mr. Emmanuel Kilaso took participants through an insightful session on Climate Change Education, covering climate change concepts, teaching sustainable solutions, and utilizing digital tools for environmental awareness.',
  },
  {
    id: 5,
    name: 'Day 5 Evaluating Teacher Competence and Action Plan for Kwara AGILE Master Trainers',
    desc: `Participants explored the relevance of digital tools for assessments in classrooms such as Microsoft Forms and Designing Rubrics for quality evaluation. Mr. Odeogbola Ayodele delivered a session on action planning with emphasis on key activities, expected outcomes, and necessary technical support required for effective implementation in AGILE Implementing schools. The plan was structured into short-term and medium-to-long-term activities, with a focus on fostering a growth mindset among educators and students.`,
  },
  {
    id: 6,
    name: 'Projects and Certificates Presentation ',
    desc: 'Participants were grouped into 10 to present their projects they kickstarted on Wednesday in the presence of Facilitators and the SPIU Team. 3 Teams were award cash gifts for their outstanding performance. The projects presented were tailored to several activities and expectations in all Kwara AGILE schools post Master Trainers Workshop. Certificates of Achievement as Master Trainers were presented to the participants, validating their competencies on Digital Literacy Skills with the session handled by the SPIU Team with Project Coordinator, Digital Skills Subcomponent Team Lead for Kwara AGILE and TedPrime Team in attendance.'
  }
];

export const TrainingSessions = () => {
  return (
    <>
      <div className="container mt-6">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 items-center justify-center gap-4">
            {data.map((item) => (
              <div
                key={item.id}
                className="flex h-[480px] w-full flex-col justify-center gap-3 rounded-lg bg-zinc-50 p-5"
              >
                <h3 className="text-lg font-semibold text-[#ef6e11]">
                  {item.name}
                </h3>
                <p className="">{item.desc}</p>
              </div>
            ))}
          </div>
      </div>
    </>
  );
};
