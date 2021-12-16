const hexToBin = (hex: string) => hex.split('').map(char => parseInt(char,16).toString(2).padStart(4,'0')).join('');
const binToInt = (bin: string) => parseInt(bin, 2);

enum TYPE_ID {
   SUM = 0,
   PRODUCT = 1,
   MINIMUM = 2,
   MAXIMUM = 3,
   LITERAL = 4,
   GREATER_THAN = 5,
   LESS_THAN = 6,
   EQUAL_TO = 7,
};

enum LENGTH_TYPE_ID {
   TOTAL_LENGTH = '0',
   NUM_OF_PACKETS = '1',
}

interface Header {
   version: number,
   typeId: number,
}

interface Literal {
   header: Header,
   number: number,
}

interface Operator {
   header: Header,
   subPackets: Packet[];
}

type Packet = Literal | Operator;

const readHeader = (binary: string): [Header, string] => {
   const version = binToInt(binary.slice(0,3));
   const typeId = binToInt(binary.slice(3,6));

   return [{version, typeId}, binary.slice(6)]
}

const readLiteralStep = (binary: string): [string, string] => {
   const reachedEnd: boolean = binary.slice(0,1) === '0'; 
   const numberBin = binary.slice(1,5);
   const followUp = binary.slice(5);
   
   if(reachedEnd){
      return [numberBin, followUp];
   }

   const [nextNum, nextFollowUp] = readLiteralStep(followUp);

   return [numberBin+nextNum, nextFollowUp];
}

const readLiteral = (binary: string): [number, string] => {
   const [numberBin, followUp] = readLiteralStep(binary);

   return [binToInt(numberBin), followUp];
}


const readTotalLengthOperator = (binary: string): [Packet[], string] => {
   const totalLength = binToInt(binary.slice(0,15));
   let packetsBin = binary.slice(15, 15+totalLength);
   const packets: Packet[] = [];

   while(packetsBin.length > 0){
      const [packet, followUp] = readPacket(packetsBin);
      packets.push(packet);
      packetsBin = followUp;
   }

   const followUp = binary.slice(15+totalLength);
   return [packets, followUp];
}

const readNumOfPacketsOperator = (binary: string): [Packet[], string] => {
   const numOfPackets = binToInt(binary.slice(0,11));
   const packets: Packet[] = [];

   let followUp = binary.slice(11)

   while(packets.length < numOfPackets){
      const [packet, nextFollowUp] = readPacket(followUp);
      followUp = nextFollowUp;
      packets.push(packet);
   }

   return [packets, followUp]; 
}

const readOperator = (binary: string): [Packet[], string] => {
   const lengthTypeId: LENGTH_TYPE_ID = binary.slice(0,1) as LENGTH_TYPE_ID;
   const followUp = binary.slice(1);

   if(lengthTypeId === LENGTH_TYPE_ID.NUM_OF_PACKETS){
      return readNumOfPacketsOperator(followUp);
   }

   return readTotalLengthOperator(followUp);

}

const readPacket = (binary: string): [ Packet, string ] => {
   const [header, followUp] = readHeader(binary);

   if(header.typeId === TYPE_ID.LITERAL){
      const [number, nextFollowUp] = readLiteral(followUp);
      return [{header, number}, nextFollowUp]
   } else {
      const [subPackets, nextFollowUp] = readOperator(followUp);
      return [ {
         header,
         subPackets,
      }, nextFollowUp]
   }
}

export const readHexPacket = (hex: string): [Packet, string] => {
    return readPacket(hexToBin(hex));
}


export const printPacket = (packet: Packet, num = 0) => {
   const pad = new Array(num).fill(' ').join('');
   console.log(pad, 't',packet.header.typeId);
   if((packet as Literal).number !== undefined){
      console.log(pad,'l', ( packet  as Literal).number);
   } else {
      const u: Operator = packet as Operator;
      u.subPackets.forEach(p => printPacket(p, num+2))
   }
}

export const versionSum = (packet: Packet) => {
   if(packet.header.typeId === TYPE_ID.LITERAL){
      return packet.header.version
   }

   return packet.header.version + (packet as Operator).subPackets.reduce((prev,cur) => prev+versionSum(cur), 0)
}

export const evaluatePacket = (packet: Packet): number => {
   if(packet.header.typeId === TYPE_ID.LITERAL){
      return (packet as Literal).number;
   }

   const operator = (packet as Operator);
   switch(operator.header.typeId){
      case TYPE_ID.SUM:
         return operator.subPackets.map(evaluatePacket).reduce((prev,cur)=>prev+cur, 0);
      case TYPE_ID.PRODUCT:
         return operator.subPackets.map(evaluatePacket).reduce((prev,cur)=>prev*cur, 1);
      case TYPE_ID.MINIMUM:
         return Math.min(...operator.subPackets.map(evaluatePacket));
      case TYPE_ID.MAXIMUM:
         return Math.max(...operator.subPackets.map(evaluatePacket));
      case TYPE_ID.GREATER_THAN:
         const evaluatedGreater = operator.subPackets.map(evaluatePacket);
         return evaluatedGreater[0] > evaluatedGreater[1] ? 1 : 0;
      case TYPE_ID.LESS_THAN:
         const evaluatedLesser = operator.subPackets.map(evaluatePacket);
         return evaluatedLesser[0] < evaluatedLesser[1] ? 1 : 0;
      case TYPE_ID.EQUAL_TO:
         const evaluatedEqual = operator.subPackets.map(evaluatePacket);
         return evaluatedEqual[0] === evaluatedEqual[1] ? 1 : 0;
      default: 
         throw new Error(`Unknown typeId ${operator.header.typeId}`)
   }
}
