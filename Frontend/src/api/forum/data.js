import { subDays, subHours, subMinutes, subSeconds } from 'date-fns';

const now = new Date();

export const forums = [
  {
    id: '24b76cac9a128cd949747080',
    userId: 1,
    labels: ['Programming', 'Sleeping'],
    cover: '/assets/covers/business-2-4x4-large.png',
    createdAt: '03-03-2024',   
    updatedAt: '03-03-2024',
    readTime: '5',
    shortDescription: 'Aliquam dapibus elementum nulla at malesuada. Ut mi nisl, aliquet non mollis vel, feugiat non nibh.',
    title: 'Why I Still Lisp, and You Should Too'
  },
  {
    id: 'a9c19d0caf2ca91020aacd1f',
    userId: 1,
    labels: ['Productivity'],
    cover: '/assets/covers/abstract-2-4x4-large.png',
    createdAt: '03-03-2024',
    updatedAt: '03-03-2024',
    readTime: '6',
    shortDescription: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    title: 'Scrum Has Hit the Glass Ceiling'
  },
  {
    id: '44df90cbf89963b8aa625c7d',
    userId: 1,
    labels: ['Entrepreneurs'],
    cover: '/assets/covers/minimal-2-4x4-large.png',
    createdAt: '03-03-2024',
    updatedAt: '03-03-2024',
    readTime: '3',
    shortDescription: 'Praesent eget leo mauris. Morbi ac vulputate nibh. In hac habitasse platea dictumst.',
    title: 'How Model View Controller (MVC) Architectures Work'
  },
  {
    id: 'c597c300fe3f817c41a2f01d',
    userId: 1,
    labels: ['Innovation'],
    cover: '/assets/covers/minimal-1-4x4-large.png',
    createdAt: '03-03-2024',
    updatedAt: '03-03-2024',
    readTime: '1',
    shortDescription: 'Phasellus eu commodo lacus, eget tristique nunc. Ut ullamcorper semper nunc sit amet vehicula.',
    title: 'Generating Passive Income Is Hard, Here Is a Better Option'
  }
];

export const forumDetail = {
  id: '24b76cac9a128cd949747080',
  userId: 1,
  labels: ['Programming'],
  content: `
## Cras at molestie lacus. Phasellus feugiat leo quis sem iaculis, sed mattis nibh accumsan.

Phasellus ullamcorper ultrices ullamcorper. Nunc auctor porttitor ex, non consequat ipsum aliquam at. Duis dapibus dolor in nisi viverra, a elementum nulla viverra. Etiam feugiat turpis leo, nec finibus diam rhoncus ac. Sed at metus et orci consequat facilisis vel vel diam.

## Cras at molestie lacus. Phasellus feugiat leo quis sem iaculis, sed mattis nibh accumsan.
  

Etiam faucibus massa auctor gravida finibus.
Cras nulla magna, dapibus sit amet accumsan nec, ullamcorper sit amet dolor.

Donec leo nisi, porta et gravida nec, tincidunt ac velit. Aliquam in turpis a quam tempus dapibus. Morbi in tellus tempor, hendrerit mi vel, aliquet tellus. Quisque vel interdum ante. Nunc quis purus sem. Donec at risus lacinia ipsum cursus condimentum at ac dui. Nulla bibendum feugiat tellus ac tristique. Proin auctor, lectus et accumsan varius, justo odio vulputate neque, et efficitur augue leo id ex. Aliquam eget turpis nisl. Nam sapien massa, sollicitudin et vehicula a, fringilla vitae purus. Praesent a vestibulum felis.

\`\`\`javascript
// This is a comment

const x = () => {};

\`\`\`

Class aptent taciti sociosqu ad litora torquent \`const d = 3;\` per conubia nostra, per inceptos himenaeos. Morbi maximus metus eget nulla malesuada, sit amet luctus est fringilla. Aenean imperdiet rhoncus justo, ut pharetra lorem gravida placerat. Duis et enim lorem. Aliquam placerat elit est, vitae fermentum ipsum finibus sed. Donec dapibus magna non tortor commodo rhoncus. Suspendisse luctus tincidunt eros, aliquet pellentesque neque venenatis quis. Aliquam auctor felis nec orci ornare gravida. Fusce ac neque sit amet nibh scelerisque molestie. Nullam in lorem viverra, aliquam nunc vel, interdum orci. Fusce mattis est neque, et tincidunt justo blandit quis. Etiam tincidunt purus in libero semper, vitae placerat dui vehicula. Pellentesque sit amet imperdiet purus, quis lacinia eros.

Duis placerat turpis non metus dapibus sagittis. Vestibulum ex massa, tempus pulvinar varius at, placerat non justo. Ut tristique nisl sed porta pulvinar. Nunc ex nibh, tempor eget elit vel, fringilla ornare risus. Praesent vel lacus finibus, laoreet nulla quis, semper tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec volutpat quis dui ac varius. Suspendisse potenti. Maecenas sagittis lacus vitae ex rhoncus, eu fringilla urna luctus.

## Donec vel erat augue. Aenean ut nisl cursus nulla tempus ultricies vel eget lorem.

Suspendisse pharetra dolor in massa molestie, vel molestie nunc accumsan. Cras varius aliquet pellentesque. Curabitur ac mi fermentum nibh congue pharetra in eu nunc. Vivamus mattis urna a fringilla facilisis. Cras finibus nulla in nulla imperdiet pharetra. Morbi vel tortor turpis.
`,
  cover: '/assets/covers/business-2-4x4-large.png',
  createdAt: '03-03-2024',
  updatedAt: '04-03-2024',
  readTime: '5',
  shortDescription: 'Aliquam dapibus elementum nulla at malesuada. Ut mi nisl, aliquet non mollis vel, feugiat non nibh.',
  title: 'Why I Still Lisp, and You Should Too'
};
