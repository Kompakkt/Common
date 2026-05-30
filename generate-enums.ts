// Generate enums compatible with the pre-TypeBox definitions
import * as schemas from './schemas';

const generateEnums = async () => {
  const enumSchemas = Object.entries(schemas).filter(
    ([_, schema]) => typeof schema === 'object' && schema !== null && 'enum' in schema,
  );

  const generatedEnums: string[] = [];

  for (const [name, schema] of enumSchemas) {
    const enumValues = schema.enum;
    if (!Array.isArray(enumValues)) continue;
    const cleanName = name.replace('EnumSchema', '');
    const enumDefinition = `export enum ${cleanName} {\n${enumValues.map((value: string) => `  ${value} = '${value}',`).join('\n')}\n}`;
    generatedEnums.push(enumDefinition);
    const typeguardDefinition = `export const is${cleanName} = (value: unknown): value is ${cleanName} =>\n  typeof value === 'string' && Object.values(${cleanName}).includes(value as ${cleanName});`;
    generatedEnums.push(typeguardDefinition);
  }

  await Bun.write('./enums.ts', generatedEnums.join('\n\n') + '\n');
};

generateEnums()
  .then(() => {
    console.log('Enums generated successfully.');
  })
  .catch(error => {
    console.error('Error generating enums:', error);
  });
