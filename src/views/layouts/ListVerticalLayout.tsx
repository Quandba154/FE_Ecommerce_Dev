//** React */
import React, { Fragment, useEffect, useState } from 'react';
//** Next.js */
import { NextPage } from 'next';
// ** MUI Imports */
import List from '@material-ui/core/List';
import { Box, Collapse, colors, ListItemButton, ListItemIcon, ListItemText, ListItemTextProps, styled, Tooltip, useTheme } from '@mui/material';
// ** ICONIFY Imports */
import IconifyIcon from "src/components/Icon"
import { VerticalItem } from 'src/configs/layout';
import { useRouter } from 'next/router';
import { hexToRGBA } from 'src/utils/hex-to-rgba';





type TProps = {
    open: boolean;
}

type TListItem = {
    level: number;
    openItems: { [key: string]: boolean };
    items: any;
    setOpenItems: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>
    disabled: boolean;
    setActivePath: React.Dispatch<React.SetStateAction<string | null>>
    activePath: string | null
}
interface TListItemText extends ListItemTextProps {
    active: boolean
}

const StyleListItemText = styled(ListItemText)<TListItemText>(({ theme, active }) => ({
    ".MuiTypography-root.MuiTypography-body1.MuiListItemText-primary": {
        textOverflow: "ellipsis",
        overflow: "hidden",
        // whiteSpace: "nowrap",
        display: "block",
        width: "100%",
        color: active ? `${theme.palette.primary.main} !important` : `rgba(${theme.palette.customColors.main},0.78)`,
        fontWeight: active ? 600 : 400
    }
}))


const RecursiveListItems: NextPage<TListItem> = ({ items, level, openItems, setOpenItems, disabled, setActivePath, activePath }) => {

    const theme = useTheme()
    const router = useRouter()
    const handleClick = (title: string) => {
        if (!disabled) {
            setOpenItems((prev) => ({
                [title]: !openItems[title] // lấy tên key là giá trị của title  ví dun DashBoard  = true ,  chứ không phải "DashBoard"
            }))
        }
    };

    const handleSelectItem = (path: string) => {
        setActivePath(path);
        if (path) {
            router?.push(path)
        }
    }
    console.log("activePath>>", activePath);

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
                                margin: "1px 0",
                                backgroundColor: ((activePath && item.path === activePath) || !!openItems[item.title]) ? `${theme.palette.primary.main} !important` : theme.palette.background.paper,
                                borderBottom: `1px solid ${((activePath && item.path === activePath) || !!openItems[item.title]) ?
                                    `${hexToRGBA(theme.palette.primary.main, 0.08)} !important` : `rgba(${theme.palette.customColors.main},0.78)
                                `}`
                            }}
                            onClick={
                                () => {
                                    if (item.childrens) {
                                        handleClick(item.title)
                                    }
                                    handleSelectItem(item.path)
                                }
                            }
                        >
                            <ListItemIcon>
                                <Box sx={{
                                    borderRadius: "8px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    display: "flex",
                                    height: "30px",
                                    width: "30px",
                                    backgroundColor:
                                        (activePath && item.path === activePath) || !!openItems[item.title]
                                            ? `${theme.palette.primary.main} !important`
                                            : theme.palette.background.paper
                                }}>
                                    <IconifyIcon
                                        icon={item.icon}
                                        style={{
                                            color:
                                                (activePath && item.path === activePath) || !!openItems[item.title]
                                                    ? `${theme.palette.customColors.lightPaperBg}`
                                                    : `rgba(${theme.palette.customColors.main},0.78)`
                                        }}
                                    />
                                </Box>

                            </ListItemIcon>
                            {!disabled &&
                                <Tooltip title={item?.title}>
                                    <StyleListItemText
                                        active={Boolean((activePath && item.path === activePath) || !!openItems[item.title])}
                                        primary={item?.title}
                                    />
                                </Tooltip>}

                            {item?.childrens?.length > 0 && (
                                <>
                                    {openItems[item.title] ? (
                                        <IconifyIcon
                                            icon="ic:twotone-expand-less"
                                            style={{
                                                transform: "rotate(180deg)",
                                                color: !!openItems[item.title] ? `${theme.palette.primary.main}` : `rgba(${theme.palette.customColors.main},0.78)`,

                                            }}
                                        />
                                    ) : (
                                        <IconifyIcon icon="eva:arrow-ios-downward-fill" />
                                    )}
                                </>
                            )}

                        </ListItemButton>
                        {
                            item?.childrens && item?.childrens.length > 0 && (
                                <>
                                    <Collapse in={openItems[item.title]} timeout="auto" unmountOnExit>
                                        <RecursiveListItems items={item.childrens} level={level + 1} openItems={openItems} setOpenItems={setOpenItems} disabled={disabled} setActivePath={setActivePath} activePath={activePath} />
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

    const [activePath, setActivePath] = useState<null | string>("")

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
            style={{ width: '100%', display: "flex", flexDirection: "column", maxWidth: 360, backgroundColor: 'background.paper', padding: 0 }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <RecursiveListItems disabled={!open} items={VerticalItem} level={1} openItems={openItems} setOpenItems={setOpenItems} activePath={activePath} setActivePath={setActivePath} />
        </List >
    )
}

export default ListVerticalLayout;