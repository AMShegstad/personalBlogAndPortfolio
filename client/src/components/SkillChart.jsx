import { useEffect, useRef } from 'react'
import { useColorModeValue, Flex } from '@chakra-ui/react'
import Chart from 'chart.js/auto';

const SkillChart = () => {
  const chartRef = useRef(null);

  const text = useColorModeValue("gray.600", "white");

  useEffect(() => {
    const xTechs = ["JavaScript","TypeScript", "React", "Node.js", "Express", "MongoDB", "Java", "Python", "HTML", "CSS", "SQL", "Git/Github", "REST APIs"];
    const ySkill = [83, 70, 75, 60, 80, 50, 65, 45, 90, 60, 35, 50, 75];
    const barColors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#8E44AD", "#E74C3C", "#3498DB", "#2ECC71", "#9B59B6", "#F39C12", "#1ABC9C", "#34495E"];

    let chartInstance = null;
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      chartInstance = new Chart(ctx, {
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
    }

    // Cleanup on unmount
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [text]);

  return (
    <Flex alignContent="center" justifyContent="center" height="400px">
      <canvas ref={chartRef} style={{ width: "100%", maxWidth: "700px", height: "100%" }} />
    </Flex>
  );
};

export default SkillChart;