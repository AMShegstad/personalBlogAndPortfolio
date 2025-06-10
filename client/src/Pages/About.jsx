import React, { useEffect, useRef } from 'react'
import { Text, Flex, Box, useColorModeValue } from '@chakra-ui/react'
import Chart from 'chart.js/auto';

const About = () => {
  const chartRef = useRef(null);

  const bg = useColorModeValue("gray.100", "gray.800");
  const text = useColorModeValue("gray.600", "white");

  useEffect(() => {
    const xTechs = ["JavaScript", "React", "Node.js", "Express", "MongoDB", "Java", "Python", "HTML", "CSS", "SQL", "Git/Github", "REST APIs"];
    const ySkill = [75, 66, 60, 80, 50, 65, 45, 90, 60, 35, 50, 75];
    const barColors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#8E44AD", "#E74C3C", "#3498DB", "#2ECC71", "#9B59B6", "#F39C12", "#1ABC9C", "#34495E"];

    const ctx = chartRef.current.getContext("2d");
    const chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: xTechs,
        datasets: [{
          label: "Skill Level (%)",
          borderColor: "rgba(0, 0, 0, 0.1)",
          backgroundColor: barColors,
          data: ySkill
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Technical Skills',
            font: {
              size: 24,
              weight: 'bold'
            },
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              color: text,
            }
          },
          y: {
            ticks: {
              color: text,
            }
          }
        }
      }
    });

    // Cleanup on unmount
    return () => {
      chartInstance.destroy();
    };
  }, [text]);

  return (
    <Box px={10} py={4} bg={bg} color={text}>
      <Flex alignContent="center" justifyContent="center">
        <Text fontSize="24px">My name is Alexander Shegstad, but you can call me Alex!</Text>
      </Flex>
      <br />
      <Text fontSize="18px" textIndent={50}>
        I am an aspiring software developer, and am actively looking for my first role in the industry. In 2024 and 2025, I both graduated from Bellevue University with my Bachelor's of Science in Software Development, Suma Cum Laude, and completed a web development bootcamp held by the University of Minnesota. I am currently working on projects using Javascript, React, Node.js, Express, and MongoDB/Mongoose, but I have some experience using Java and Jakarta EE for web development! I am always eager and ready to learn even more, of course!
      </Text>
      <br />
      <Text fontSize="18px" textIndent={50}>
        Plans for future projects include web apps using Java and Spring, a small computer game using Java and LIBGDX, and return to some projects from school that I now feel more confident I can develop to greater heights. Java was my first computer langauge, and I truly enjoy working with it. I am also interested in finding new and exciting tools for front-end development, whether they be new component libraries, langauges, or npm packages, that can supercharge my creativity while minimizing time-to-mvp.
      </Text>
      <br />
      <Text fontSize="18px" textIndent={50}>
        I have worked in retail for the past 18 years, and pride myself and having very strong soft skills that will allow to be a productive member of just about any team of people. I am currently a Service & Engagement Team Leader, a role that requires skill in leadership, teamwork, problem-solving, adaptability, time management, critical thinking, and conflict resolution/deescalation.
      </Text>
      <br />
      <Text fontSize="18px" textIndent={50}>
        As a leader of one of the store's largest teams, I would describe my leadership style as educational and empathetic. I truly believe that there is nothing asked of us that we cannot handle with proper training and education. I work hard to make sure that my team is backed and supported by leadership that understands that they are one of the most important assets we have. I am not only a leader, but their first line of support in terms of supplies, morale, safety, work culture, and more.
      </Text>
      <br />
      <Flex alignContent="center" justifyContent="center" height="400px">
        <canvas ref={chartRef} style={{ width: "100%", maxWidth: "700px", height: "100%" }} />
      </Flex>
    </Box>
  );
}

export default About;