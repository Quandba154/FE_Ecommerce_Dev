//** React */
import React, { Fragment, useEffect, useState } from 'react';
//** Next.js */
import { NextPage } from 'next';
// ** MUI Imports */
import List from '@material-ui/core/List';
import { Box, Collapse, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
// ** ICONIFY Imports */
import IconifyIcon from "src/components/Icon"
import { VerticalItem } from 'src/configs/layout';



type TProps = {
    open: boolean;
}

type TListItem = {
    level: number;
    openItems: { [key: string]: boolean };
    items: any;
    setOpenItems: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>
    disabled: boolean;
}

const RecursiveListItems: NextPage<TListItem> = ({ items, level, openItems, setOpenItems, disabled }) => {

    const handleClick = (title: string) => {
        if (!disabled) {
            setOpenItems((prev) => ({
                ...prev, [title]: !prev[title] // lấy tên key là giá trị của title  ví dun DashBoard  = true ,  chứ không phải "DashBoard"
            }))
        }
    };
    return (
        <>
            {items?.map((item: any) => {
                // console.log(">>>>", item.title, level);
                return (
                    <React.Fragment key={item.title}>
                        <ListItemButton
                            style={{
                                display: "flex",
                                padding: `8px 10px 8px ${level * (level === 1 ? 28 : 20)}px`,
                            }}
                            onClick={
                                () => {
                                    if (item.childrens) {
                                        handleClick(item.title)
                                    }
                                }
                            }>
                            <ListItemIcon>
                                <IconifyIcon icon={item.icon} />
                            </ListItemIcon>
                            {!disabled && <ListItemText primary={item?.title} />}
                            {item?.childrens && item?.childrens.length > 0 ? (
                                openItems[item.title] ? <IconifyIcon icon="eva:arrow-ios-upward-fill" /> : <IconifyIcon icon="eva:arrow-ios-downward-fill" />
                            ) : null}

                        </ListItemButton>
                        {
                            item?.childrens && item?.childrens.length > 0 && (
                                <>
                                    <Collapse in={openItems[item.title]} timeout="auto" unmountOnExit>
                                        <RecursiveListItems items={item.childrens} level={level + 1} openItems={openItems} setOpenItems={setOpenItems} disabled={disabled} />
                                    </Collapse>
                                </>
                            )
                        }
                    </React.Fragment >
                )
            })}
        </>
    )
}

const ListVerticalLayout: NextPage<TProps> = ({ open }) => {

    const [openItems, setOpenItems] = useState<({ [key: string]: boolean })>({});

    useEffect(() => {
        if (!open) {
            setOpenItems({});
        }
    }, [open])
    const handleToggleAll = () => {
        setOpenItems({});
    };


    return (
        <List
            style={{ width: '100%', display: "flex", flexDirection: "column", maxWidth: 360, backgroundColor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <RecursiveListItems disabled={!open} items={VerticalItem} level={1} openItems={openItems} setOpenItems={setOpenItems} />
        </List >
    )
}

export default ListVerticalLayout;