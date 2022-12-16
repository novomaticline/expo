import { renderMethod } from './APISectionMethods';

import { H2, H3Code, H4 } from '~/components/plugins/Headings';
import { APIDataType } from '~/components/plugins/api/APIDataType';
import {
  CommentData,
  InterfaceDefinitionData,
  MethodSignatureData,
  PropData,
} from '~/components/plugins/api/APIDataTypes';
import { APISectionDeprecationNote } from '~/components/plugins/api/APISectionDeprecationNote';
import { APISectionPlatformTags } from '~/components/plugins/api/APISectionPlatformTags';
import {
  CommentTextBlock,
  getTagData,
  mdComponents,
  parseCommentContent,
  renderFlags,
  renderParamRow,
  ParamsTableHeadRow,
  resolveTypeName,
  renderDefaultValue,
  STYLES_APIBOX,
  STYLES_NESTED_SECTION_HEADER,
  getTagNamesList,
  STYLES_APIBOX_NESTED,
  STYLES_ELEMENT_SPACING,
} from '~/components/plugins/api/APISectionUtils';
import { Cell, Row, Table } from '~/ui/components/Table';
import { BOLD, P, CODE } from '~/ui/components/Text';

export type APISectionInterfacesProps = {
  data: InterfaceDefinitionData[];
};

const renderInterfaceComment = (
  comment?: CommentData,
  signatures?: MethodSignatureData[],
  defaultValue?: string
) => {
  if (signatures && signatures.length) {
    const { type, parameters, comment: signatureComment } = signatures[0];
    const initValue = defaultValue || getTagData('default', signatureComment)?.text;
    return (
      <>
        {parameters?.length ? parameters.map(param => renderParamRow(param)) : null}
        <BOLD>Returns: </BOLD>
        <CODE>{resolveTypeName(type)}</CODE>
        {signatureComment && (
          <>
            <br />
            <APISectionDeprecationNote comment={comment} />
            <CommentTextBlock
              comment={signatureComment}
              components={mdComponents}
              afterContent={renderDefaultValue(initValue)}
            />
          </>
        )}
      </>
    );
  } else {
    const initValue = defaultValue || getTagData('default', comment)?.text;
    return (
      <>
        <APISectionDeprecationNote comment={comment} />
        <CommentTextBlock
          comment={comment}
          components={mdComponents}
          afterContent={renderDefaultValue(initValue)}
          emptyCommentFallback="-"
        />
      </>
    );
  }
};

const renderInterfacePropertyRow = ({
  name,
  flags,
  type,
  comment,
  signatures,
  defaultValue,
}: PropData): JSX.Element => {
  const initValue = parseCommentContent(defaultValue || getTagData('default', comment)?.text);
  return (
    <Row key={name}>
      <Cell fitContent>
        <BOLD>{name}</BOLD>
        {renderFlags(flags, initValue)}
      </Cell>
      <Cell fitContent>
        <APIDataType typeDefinition={type} />
      </Cell>
      <Cell fitContent>{renderInterfaceComment(comment, signatures, initValue)}</Cell>
    </Row>
  );
};

const renderInterface = ({
  name,
  children,
  comment,
  extendedTypes,
}: InterfaceDefinitionData): JSX.Element | null => {
  const interfaceChildren = children?.filter(child => !child?.inheritedFrom) || [];

  if (!interfaceChildren.length) return null;

  const interfaceMethods = interfaceChildren.filter(child => child.signatures);
  const interfaceFields = interfaceChildren.filter(child => !child.signatures);

  return (
    <div key={`interface-definition-${name}`} css={[STYLES_APIBOX, STYLES_APIBOX_NESTED]}>
      <APISectionDeprecationNote comment={comment} />
      <APISectionPlatformTags comment={comment} prefix="Only for:" />
      <H3Code tags={getTagNamesList(comment)}>
        <CODE>{name}</CODE>
      </H3Code>
      {extendedTypes?.length ? (
        <P css={STYLES_ELEMENT_SPACING}>
          <BOLD>Extends: </BOLD>
          {extendedTypes.map(extendedType => (
            <CODE key={`extend-${extendedType.name}`}>{resolveTypeName(extendedType)}</CODE>
          ))}
        </P>
      ) : null}
      <CommentTextBlock comment={comment} includePlatforms={false} />
      {interfaceMethods.length ? (
        <>
          <div css={STYLES_NESTED_SECTION_HEADER}>
            <H4>{name} Methods</H4>
          </div>
          {interfaceMethods.map(method => renderMethod(method, { exposeInSidebar: false }))}
        </>
      ) : undefined}
      {interfaceFields.length ? (
        <>
          <div css={STYLES_NESTED_SECTION_HEADER}>
            <H4>{name} Properties</H4>
          </div>
          <Table>
            <ParamsTableHeadRow />
            <tbody>{interfaceFields.map(renderInterfacePropertyRow)}</tbody>
          </Table>
        </>
      ) : undefined}
    </div>
  );
};

const APISectionInterfaces = ({ data }: APISectionInterfacesProps) =>
  data?.length ? (
    <>
      <H2 key="interfaces-header">Interfaces</H2>
      {data.map(renderInterface)}
    </>
  ) : null;

export default APISectionInterfaces;
