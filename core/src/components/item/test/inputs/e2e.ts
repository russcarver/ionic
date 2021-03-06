import { E2EPage, newE2EPage } from '@stencil/core/testing';

test('item: inputs', async () => {
  const page = await newE2EPage({
    url: '/src/components/item/test/inputs?ionic:_testing=true'
  });

  // check form
  await page.click('#submit');
  await checkFormResult(page, '{"date":"","select":"n64","toggle":"","input":"","input2":"","checkbox":""}');

  // Default case, enabled and no value
  let compare = await page.compareScreenshot();
  expect(compare).toMatchScreenshot();

  // Disable everything
  await page.click('#btnDisabled');
  await page.waitFor(250);

  // check form
  await page.click('#submit');
  await checkFormResult(page, '{}');

  // screenshot
  compare = await page.compareScreenshot('should disable all');
  expect(compare).toMatchScreenshot();

  // Reenable and set some value
  await page.click('#btnDisabled');
  await page.click('#btnSomeValue');
  await page.waitFor(100);

  // check form
  await page.click('#submit');
  await checkFormResult(page, '{"date":"2016-12-09","select":"nes","toggle":"on","input":"Some text","input2":"Some text","checkbox":"on"}');

  compare = await page.compareScreenshot('should reenable and set value');
  expect(compare).toMatchScreenshot();

  // Set "null"
  await page.click('#btnNullValue');
  await page.waitFor(250);

  compare = await page.compareScreenshot('should set null');
  expect(compare).toMatchScreenshot();

  // Set "empty"
  await page.click('#btnEmptyValue');
  await page.waitFor(250);

  compare = await page.compareScreenshot('should set empty');
  expect(compare).toMatchScreenshot();

  // Set "empty"
  await page.click('#btnEmptyValue');
  await page.waitFor(250);

  compare = await page.compareScreenshot('should set empty');
  expect(compare).toMatchScreenshot();
});

async function checkFormResult(page: E2EPage, content: string) {
  const div = await page.find('#form-result');
  expect(div.textContent).toEqual(content);
}
