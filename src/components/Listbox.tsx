import React, { useState } from 'react'
import {
  Box,
  Checkbox,
  Stack,
  HStack,
  Flex,
  Spacer,
  Grid,
  Center,
  Text,
  Button,
  Input,
  ListItem,
  DiscList,
  NumberInput,
} from "@yamada-ui/react"

export const Listbox = ({ message }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputNumber, setInputNumber] = useState<number>(0);
  const [items, setItems] = useState<Item[]>([]);

  type Item = {
    inputValue: string;
    id: number;
    checked: boolean;
    inputNumber: number;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //console.log(e.target.value);
    setInputValue(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newItem: Item = {
      inputValue: inputValue,
      id: items.length,
      checked: false,
      inputNumber: inputNumber,
    };

    setItems([newItem, ...items]);
    setInputValue("");
    setInputNumber(0);
  }

  const handleEdit = (id: number, inputValue: string) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.inputValue = inputValue;
      }
      return item;
    });

    setItems(newItems);
  }

  const handleNum = (id: number, inputNumber: number) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.inputNumber = inputNumber;
      }
      return item;
    });

    setItems(newItems);
  }

  const handleChecked = (id: number, checked: boolean) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.checked = !checked;
      }
      return item;
    });

    setItems(newItems);
  }

  const handleDelete = (id: number) => {
    const newItems = items.filter((item) => item.id !== id);

    setItems(newItems);
  }

  return (
    <Box bg='gray.100' p={6} rounded='md' >
      <Box textAlign="center">
        <Text fontSize='2xl'>{message}</Text>
      </Box>

      <Stack>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Flex gap={4}>
            <Input
              type='text'
              bgColor='white'
              placeholder='Item'
              value={inputValue}
              onChange={(e) => handleChange(e)}>
            </Input>
            <Button textColor='white' colorScheme='primary' type='submit'>
              Add
            </Button>
          </Flex>
        </form>
        <Flex justifyContent="center">
          <DiscList>
            <Stack>
              {items.map((item) => (
                <ListItem key={item.id}>
                  <HStack>
                    <Input
                      type='text'
                      bgColor='white'
                      onChange={(e) => handleEdit(item.id, e.target.value)}
                      value={item.inputValue}
                      disabled={item.checked}
                    />
                    <NumberInput
                      bgColor='white'
                      min={0}
                      onChange={(value) => handleNum(item.id, parseInt(value))}
                    />
                    <Checkbox
                      bgColor='white'
                      size='lg'
                      onChange={() => handleChecked(item.id, item.checked)}
                    />
                    <Button size='sm' colorScheme='red' onClick={() => handleDelete(item.id)}>
                      Delete
                    </Button>
                  </HStack>
                </ListItem>
              ))}
            </Stack>
          </DiscList>
        </Flex>
      </Stack>
    </Box>
  )
}