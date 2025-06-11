import React from 'react';
import { Box, Text, Image, useColorModeValue } from '@chakra-ui/react';
import nameAndLogo from '/assets/images/_nameAndLogo.png';

const MainBlogPostCard = () => {

  const bg = useColorModeValue("gray.100", "gray.800");
  const text = useColorModeValue("gray.600", "white"); 
  
  return (
    <Box as="section" p={4} borderRadius="md" boxShadow="md" width="100%" bg={bg} color={text}>
      <Text fontSize={{ base: 'md', md: 'lg', lg: 'lg'}} fontWeight="bold">Selected Blog Post</Text>
      <br />
      <Image src={nameAndLogo} alt="" height="300px" float="left" marginRight={5} borderRadius="lg"/>
      <h4>This is a featured blog post. It contains important information and updates.</h4>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus sequi magnam sed cupiditate nihil eos laboriosam ipsam assumenda exercitationem pariatur numquam veritatis eaque, obcaecati aspernatur inventore quas maxime tempore ea iusto, repellat atque illo porro? Quasi harum rerum corporis consectetur, ipsam et laudantium enim possimus ut neque, aliquid quod cumque vitae unde nam eligendi optio earum nostrum! Cupiditate vel vitae, saepe neque, nostrum esse reprehenderit delectus aliquam officiis temporibus quasi voluptas maxime asperiores possimus sapiente adipisci sunt aliquid ratione corrupti quaerat. Ullam ex, quos esse similique vero non amet culpa facilis aspernatur nulla at minus illum ratione sed provident dicta nobis cum sit cumque delectus quod adipisci. Amet vel distinctio iste fugiat. Modi, fugiat. Totam nihil illum, ad hic, vitae veritatis assumenda voluptatibus eius eos ullam illo deserunt quibusdam error, quam in vero non dolore! Illo pariatur assumenda quae repellendus corporis aperiam repudiandae sunt voluptate omnis earum dignissimos veniam ducimus tempora fugit alias dolorem asperiores eveniet, autem cumque vel. Debitis non eos unde eligendi quae. Obcaecati quos molestias dolores in illo error ipsum, suscipit maiores aliquid doloribus, dolorum, culpa atque saepe? Itaque deleniti nesciunt pariatur nihil, minus perspiciatis reprehenderit nam distinctio quis, adipisci expedita voluptatum.</p> 
      <br /> 
      <p>In quidem earum, ratione illo magni ducimus consequatur perferendis blanditiis amet sint adipisci debitis dolorem? Dicta debitis autem quod velit maiores omnis culpa, necessitatibus sapiente, nisi porro, suscipit earum eos aspernatur aut eveniet laborum sunt repellat quaerat eligendi? Voluptatem reprehenderit ad adipisci sit animi. Magni molestiae quasi earum illo officiis harum! Ratione praesentium perferendis voluptates iste fugit deleniti aliquam corporis, eveniet a aliquid suscipit. Unde quisquam illo explicabo at. Deserunt nostrum praesentium nobis itaque esse est architecto, distinctio hic tempore, voluptates molestias aut maiores facilis sequi similique explicabo! Alias assumenda qui architecto sequi ipsa porro odio inventore obcaecati libero quisquam quis deserunt quidem blanditiis sint in eaque, nostrum sit quia dolores doloribus exercitationem nisi labore minima cum. Repellat tempore ipsam, mollitia, provident modi molestias nesciunt id optio iusto odio minima! Odit ipsa quisquam neque modi perferendis nihil nisi eligendi temporibus, repellat consequatur corrupti accusamus earum eveniet maxime explicabo facere animi distinctio, harum inventore quia sed repudiandae provident ab. Explicabo magnam obcaecati voluptatibus natus vitae ratione beatae incidunt architecto molestiae dolorum quisquam, cum aliquam maiores itaque tenetur repellat qui culpa ut possimus labore amet eos ipsam? In optio fugiat, maiores libero nobis eveniet consequuntur id nihil explicabo rem sapiente modi ad laboriosam provident quasi repellendus praesentium!
      </p>
    </Box>
  )
}

export default MainBlogPostCard