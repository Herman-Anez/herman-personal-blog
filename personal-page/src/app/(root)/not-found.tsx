import { Column, Heading, Text } from "@once-ui-system/core";
import { getDictionary } from "@/shared/i18n/dictionaries";

const dict = getDictionary("es");

export default function NotFound() {
  return (
    <Column as="section" fill center paddingBottom="160">
      <Text marginBottom="s" variant="display-strong-xl">
        {dict.ui.pageNotFound}
      </Text>
      <Heading marginBottom="l" variant="display-default-xs">
        {dict.ui.pageNotFoundTitle}
      </Heading>
      <Text onBackground="neutral-weak">{dict.ui.pageNotFoundDescription}</Text>
    </Column>
  );
}
